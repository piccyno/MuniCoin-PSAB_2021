/**
 * @name: MUNICOIN
 * @description: PSAB Project - 2021
 * @authors: Picciau, Chelo
 * 
 */

import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import Web3 from 'web3'

import Comune from '../abis/Comune.json'
import MuniCoin from '../abis/MuniCoin.json'
import Navbar from './Navbar'
import Main from'./Main.js'
import GiustView from './giustificativi.js'
import PayView from './pagamenti.js'
import AccView from './accreditamento.js'
import SaldoView from './saldo.js'

//import del DB dimostrativo
import soggettiFile from '../db.muni'

import './App.css'

const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');

//Keys
var chiaviSoggettoAccreditato = {
	secretKey: "",
	publicKey: ""
}; 

var chiaviComune = {
	secretKey: "",
	publicKey: ""
};

var soggetti = new Object();

/**
 * 
 * Classe motore della web-app
 * 
 */
class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
	    account: '0x0',
	    loading: true,
			cifraMessaggio: '',	
			decifraMessaggio: '',
			getGiustificativi:'',
			cifrato: {},
			decifrato: '',
			OTC: [],
			giustificativoCifrato: {},
			valoriGiustificativi: [],
			comune: {},
			municoin: {}
		}
		this.loadSoggetti()
	}


	/**
	 * caricamento dei soggetti accreditati dal DB
	 */
	loadSoggetti(){
		console.log("loadSoggetti")
		console.log(soggettiFile)
		fetch(soggettiFile)
    .then((r) => r.text())
    .then(text  => {
      let rows = text.split('\n');
      //recupero la chiave pubblica del comune
      chiaviComune.publicKey = rows[0].split('\t')[1];
      //recupero tutte le chiavi pubbliche
      for (const element of rows){
      	let items = element.split('\t');
      	let values = [items[1], items[2]];
      	soggetti[items[0]] = values;
      }
    })
    console.log(soggetti)
	}


	/**
	 * dato un indirizzo blockchain restituisce il nome del soggetto corrispondente
	 * se quest'ultimo è registrato nel sistema
	 */
	nomeSoggetto(indirizzo) {
		if (indirizzo in soggetti){
			return soggetti[indirizzo][1]
		}else{
			return "n/a"
		}
	}


	/**
	 * dato un indirizzo blockchain restituisce la chiave pubblica del soggetto corrispondente
	 * se quest'ultimo è registrato nel sistema
	 */
	chiaveSoggetto(indirizzo) {
		if (indirizzo in soggetti){
			return soggetti[indirizzo][0]
		}else{
			return "0"
		}
	}


	async componentWillMount() {
		await this.loadWeb3()
		await this.loadBlockchainData()
	}
	
	
	async loadWeb3() {
		if (window.ethereum) {
		  window.web3 = new Web3(window.ethereum)
		  await window.ethereum.enable()
		}
		else if (window.web3) {
		  window.web3 = new Web3(window.web3.currentProvider)
		}
		else {
		  window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
	}
	
	
	/**
	 * carica i dati dalla blockchain
	 */
	async loadBlockchainData() {
		const web3 = window.web3
		const accounts = await web3.eth.getAccounts()
		
		this.setState({account: accounts[0]})
		console.log("account")
		console.log(this.state.account)

		var networkId = await web3.eth.net.getId()
		
		// Load ethAccountBalance
		var balance = await web3.eth.getBalance(this.state.account)
		//console.log(balance)
		this.setState({ethAccountBalance: balance})

    // Contratto Comune
    const ComuneData = Comune.networks[networkId]
    if(ComuneData) {
      const comune = new web3.eth.Contract(Comune.abi, ComuneData.address)
    	this.setState({ comune })   
	    
    }else {
      window.alert('Comune contract not deployed to detected network.')
    }
	
		// Contratto MuniCoin
    const MuniCoinData = MuniCoin.networks[networkId]
    if(MuniCoinData) {
      const municoin = new web3.eth.Contract(MuniCoin.abi, MuniCoinData.address)
    	this.setState({ municoin })   
	   
    }else {
      window.alert(' MuniCoin contract not deployed to detected network.')
    }
	
		this.setState({ loading: false })
  }


  /**
   * Dato il testo del giustificativo in json in chiaro,
   * lo cifra con crittografia asimmetrica
   * Mittente: soggetto accreditato autenticato
   * Destinatario: comune
   */
	cifraMessaggio = async (plain_text) => {		
		//OTC
		const one_time_code = nacl.randomBytes(24);
		console.log(one_time_code)
		console.log("chiave comune " + chiaviComune.publicKey)
		
	  //Get the cipher text
	  const cipher_text = nacl.box(
	      nacl.util.decodeUTF8(plain_text),
	      one_time_code,
	      nacl.util.decodeBase64(chiaviComune.publicKey),	// cifriamo msg con chiave del destinatario (solo lui legge con SK)
	      nacl.util.decodeBase64(chiaviSoggettoAccreditato.secretKey)	// cifriamo msg con nostra chiave (garantita autenticità mittente)
	  );
		
		console.log("cipher_text:")
		console.log(cipher_text);
		console.log(typeof(cipher_text));

	  //message to be sent to everyone
	  const message_in_transit = {cipher_text,one_time_code};
		this.state.giustificativoCifrato = message_in_transit;
		console.log("giustificativoCifrato:")
		console.log(this.state.giustificativoCifrato);
		
		this.state.OTC = Array.from(one_time_code)
		this.state.cifrato = Array.from(cipher_text)

		//---------CODIFICA IN STRINGA----------
		let cipher_text_string = nacl.util.encodeBase64(cipher_text)
		let OTC_text_string = nacl.util.encodeBase64(one_time_code)

		console.log("Stringa OTC:")
		console.log(OTC_text_string)
		console.log("Stringa cifrata")
		console.log(cipher_text_string)
	}

	
	/**
	 * Dato un giustificativo cifrato,
	 * decifra il pacchetto e rende il contenuto leggibile
	 * scorporando il json nelle sue parti
	 */
	decifraMessaggio =  (gc) => {
	  let giustificativoCifrato = Uint8Array.from(gc.cipherText);
		let OTC = Uint8Array.from(gc.OTC);

		chiaviSoggettoAccreditato.publicKey = this.chiaveSoggetto(gc.indirizzo)

		//decifratura del giustificativo
	  let decoded_message = nacl.box.open(
			giustificativoCifrato,
			OTC,
			nacl.util.decodeBase64(chiaviSoggettoAccreditato.publicKey), 
			nacl.util.decodeBase64(chiaviComune.secretKey)	  
	  );
		
	  console.log("decoded_message-prima:");
		console.log(decoded_message);
		
		if( decoded_message === null )
			decoded_message = false;
		
		console.log("decoded_message:");
		console.log(decoded_message);
		 
		//Get the human readable message
		this.state.decifrato = nacl.util.encodeUTF8(decoded_message)

	  //return the plaintext
		console.log("Decifrato:")
		console.log(this.state.decifrato);

		var giustificativoJsonObj;

		try{
			giustificativoJsonObj = JSON.parse(this.state.decifrato);
		}catch{
			giustificativoJsonObj = {
				idGiustificativo: "n/a",
				descrizione: "n/a",
				dataEmissione: "n/a",
				importo: "n/a"
			}
		}
		 
		return giustificativoJsonObj;
		document.getElementById("txtDecifrato").value = this.state.decifrato
	}


	/**
	 * Aggiunge un giustificativo nella blockchain
	 */
	aggiungiGiustificativo = async (giustificativo, chiave) => {
		if (chiave.length != 44){
			chiaviSoggettoAccreditato.secretKey = "00000000000000000000000000000000"
			alert("Formato chiave inserita non corretto")
		}else{
			chiaviSoggettoAccreditato.secretKey = chiave;
			await this.cifraMessaggio(giustificativo);
			console.log("addGiustificativo:")
			console.log(this.state.OTC);
			console.log(this.state.cifrato);
			
			await this.state.comune.methods.addGiustificativo(this.state.OTC, this.state.cifrato).send({from: this.state.account})
			let idG = await this.state.comune.methods.getUltimoIdGiustificativo().call()
			console.log("Ultimo id giustificativo")
			console.log(idG)

			let contenutoUltimoGiustificativo = await this.state.comune.methods.getGiustificativo(idG).call()
			console.log("Ultimo giustificativo inserito:")
			console.log(contenutoUltimoGiustificativo)

			let valGiustificativi =  await this.state.comune.methods.getValoriGiustificativi().call()
			console.log("valoriGiustificativi")

			this.state.valoriGiustificativi =  valGiustificativi
			console.log(this.state.valoriGiustificativi)
			
		}
	}
	
	
	/**
	 * Aggiunge un soggetto accreditato nel sistema
	 * attribuendogli una coppia di chiavi generata automaticamente
	 */
	aggiungiSoggettoAccreditato = async (nome, indirizzo, ppKey, psKey) => {
		console.log("aggiungiSoggettoAccreditato")
		console.log("nome")
		console.log(nome)
		console.log("indirizzo")
		console.log(indirizzo)
		
		if(indirizzo in soggetti){
			alert("Soggetto già accreditato")
		}else{
			const chiavi = nacl.box.keyPair();
			var pKey = nacl.util.encodeBase64(chiavi.publicKey);
			var sKey = nacl.util.encodeBase64(chiavi.secretKey);
			let values = [pKey, nome];
			soggetti[this.account] = values;
			console.log("SecretKey: " + sKey)
			console.log("PublicKey: " + pKey)
			ppKey.innerHTML = pKey;
			psKey.innerHTML = sKey;
			alert("Accreditamento soggetto completato");
		}
	}
	
	
	/**
	 * Dato un id giustificativo
	 * restituisce il giustificativo corrispondente
	 */
	getGiustificativoById = async (Id) => {	
	  let giustificativo = await this.state.comune.methods.getGiustificativo(Id).call()
		console.log("giustificativo in getGiustificativoById")	
		
		this.state.cifrato = giustificativo;
		console.log(this.state.cifrato)
	}
	
	
	/**
	 * Recupero di tutti i giustificativi
	 */
	getGiustificativi = async () => {
		let valGiust;
		try
		{
			valGiust = await this.state.comune.methods.getValoriGiustificativi().call();
		}
		catch(err)
		{
			console.log("Errore: "+valGiust);
		}
		finally
		{
			console.log("---- getGiustificativi: giustificativi ricavati dalla blockchain ----");
			console.log(valGiust);
			this.state.valoriGiustificativi = valGiust;
			return valGiust;
		}
	}


	/**
	 * Recupero della chiave privata inserita dall'utente
	 */
	getChiave = () => {
		let status = false
		let chiavePrivata = document.getElementById("txtChiavePrivata").value;
		if (chiavePrivata.length != 44){
			chiavePrivata = "00000000000000000000000000000000"
			alert("Formato chiave inserita non corretto")
		}else{
			status = true;
		}
		console.log("Chiave letta dal campo:")
		console.log(chiavePrivata)
		chiaviComune.secretKey = chiavePrivata;
		return status;
	}


	/**
	 * Pagamento di un giustificativo
	 */
	pagaSoggetto = async (destinatario, idGiustificativo, importo) => {	
	 	this.state.municoin.methods.approve(destinatario, importo).send({ from: this.state.account })
		.on('transactionHash',
				(hash) => {
				  this.state.municoin.methods.transfer(destinatario,importo).send({ from: this.state.account })
					console.log("PAGATO!!!")
					console.log("this.state.comune: " + this.state.comune)
					console.log("idGiustificativo: " + idGiustificativo)
					//imposta come pagato
					this.state.comune.methods.setPagato(idGiustificativo).send({ from: this.state.account })
				}
		)
	}
	
	
	/**
	 * Dato l'indirizzo del soggetto accreditato, restituisce il saldo del suo conto in MuniCoin
	 */
	getSaldo = async (indSoggetto) => {
		try
		{
			var saldo = await this.state.municoin.methods.balanceOf(indSoggetto).call({from: this.state.account});
		}
		catch(err)
		{
			console.log("Errore: " + saldo);
		}
		finally
		{
			console.log("Saldo finally: " + saldo)
			return saldo
		}
	}




  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
		  <BrowserRouter>
			  <div>
				
				 <Route 
						exact path="/accreditamento"
						render={(props) => (
								<AccView {...props}
								loading = {this.loading}
								account = {this.state.account}
								aggiungiSoggettoAccreditato = {this.aggiungiSoggettoAccreditato}
								/>
								)}
					/>
							
					<Route 
						exact path='/aggiungiGiustificativi'
						render={(props) => (
							<Main {...props}
							loading = {this.loading}
							account = {this.account}
							cifraMessaggio = {this.cifraMessaggio}
							decifraMessaggio = {this.decifraMessaggio}
							aggiungiGiustificativo = {this.aggiungiGiustificativo}
							decifrato = {this.decifrato}
							/>
						)}
					/>
							
					<Route 
						exact path="/visualizzaGiustificativi"
						render={(props) => (
								<GiustView {...props}
								loading = {this.loading}
								account = {this.account}
								decifraMessaggio = {this.decifraMessaggio}
								getGiustificativi = {this.getGiustificativi}
								cifrato = {this.cifrato}
								decifrato = {this.state.decifrato}
								getChiave = {this.getChiave}
								nomeSoggetto = {this.nomeSoggetto}
								/>
								)}
					/>
				
					<Route exact path="/pagamenti"
						render={(props) => (
								<PayView {...props}
								loading = {this.loading}
								account = {this.account}
								decifraMessaggio = {this.decifraMessaggio}
								cifrato = {this.state.cifrato}
								decifrato = {this.state.decifrato}
								getGiustificativoById = {this.getGiustificativoById}
								pagaSoggetto = {this.pagaSoggetto}
								/>
								)}
					
					/>

					<Route exact path="/saldo"
						render={(props) => (
								<SaldoView {...props}
								loading = {this.loading}
								account = {this.state.account}
								getSaldo = {this.getSaldo}
								nomeSoggetto = {this.nomeSoggetto}
								/>
								)}
					/>

			  </div>
			</BrowserRouter>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;