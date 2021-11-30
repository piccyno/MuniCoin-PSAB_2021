/**
 * @name: MUNICOIN
 * @description: PSAB Project - 2021
 * @authors: Picciau, Chelo
 * */

import React, { Component } from 'react'
import Web3 from 'web3'
import mnc from '../MuniCoin.png'
import eth from '../eth-logo.png'

/**
 * 
 * Classe per la pagina principale della web-app
 * 
 */
class Main extends Component {	

  render() {
	  
	  let content

	  if(this.props.loading)
	  return(
		   <p id="loader" className="text-center">Loading...</p>
	  )
	  else 
		  return (		
			 
		    <div id="content" className="mt-3">

			  <p id="loader" className="text-center">{this.props.account}</p>
		        

				<div className="card mb-4" >

		          <div className="card-body">	
					 <form className="mb-3" onSubmit={(event) => {
		                event.preventDefault()
		                let msg = this.input.value.toString()
		                let chiave = document.getElementById("txtChiavePrivata").value
		                this.props.aggiungiGiustificativo(msg, chiave)	
		              }}>

		      		<label>Soggetto Accreditato, inserisci la tua chiave privata:</label><br/>
		      		<input type="text" id="txtChiavePrivata" name="txtChiavePrivata" size="44" className="form-control form-control-lg" required/><br/><br/>
		              
		              <div className="input-group mb-4">
		                <textarea
						  id="txtPlain"
		                  ref={(input) => { this.input = input }}
		                  className="form-control form-control-lg"
		                  placeholder="Inserisci testo fattura"
		                  required 
						  rows="5"
						  cols="50"/>
		             
		              </div>
		              <button type="submit" className="btn btn-primary btn-block btn-lg">Aggiungi giustificativo!</button>
					  
		            </form>	
					
					
				 </div>
				</div>
      </div>
    );
  }
}



export default Main;