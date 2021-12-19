/*
This software is distributed under MIT/X11 license
Copyright (c) 2021 Fabrizio Chelo & Simone Picciau - University of Cagliari
Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @name: MUNICOIN
 * @description: PSAB Project - 2021
 * @authors: Picciau, Chelo
 * */

import React, { Component } from 'react'
import mnc from '../MuniCoin.png'
import spunta from '../spunta-verde.png'
import key from '../key.png'

/**
 * 
 * Classe per la pagina Giustificativi
 * 
 */
class GiustView extends Component {	

  render() {

		if(this.props.loading){
		  return(
			   <p id="loader" className="text-center">Loading...</p>
		  )
		}else{
	 
	    return (
	    	<div id="content" className="mt-3">	    	  	
		      <h1> Giustificativi  </h1>
		      <form>
		      <label>Inserisci la chiave privata del Comune:</label><br/>
		      <input type="text" id="txtChiavePrivata" name="txtChiavePrivata" size="44" className="form-control form-control-lg" required/><br/><br/>
		      <button type="submit" id="getG" className="btn btn-primary btn-block btn-lg"
				              onClick={(event) => {
				                	event.preventDefault()
				                	if (this.props.getChiave()){
				                		let rows = this.props.getGiustificativi()
					                	rows.then((result) => {
					                		let tabellaGiust = "<tr>"
					                		tabellaGiust += "<th>Nome Sogg. Accr.</th>"
					                		tabellaGiust += "<th>ID Doc.</th>"					                		
					                		tabellaGiust += "<th>Descrizione</th>"
					                		tabellaGiust += "<th>Data</th>"
					                		tabellaGiust += "<th>Importo</th>"
					                		tabellaGiust += "<th>Paga</th>"
					                		tabellaGiust += "</tr>"
											var index = 0;
											result.forEach(item => {
												console.log("item: ")
												console.log(item)
												var rigaGiustificativo = this.props.decifraMessaggio(item)
												var status = item.status
												if (rigaGiustificativo.idGiustificativo == 'n/a'){
													status = -1
												}
												
												var indirizzo = item.indirizzo
												var idGiustificativo = item.idGiustificativo
												rigaGiustificativo.nomeSoggetto = this.props.nomeSoggetto(indirizzo)
												rigaGiustificativo.indirizzo = indirizzo
												rigaGiustificativo.idGiustificativo = idGiustificativo
												let jsonStringGiust = JSON.stringify(rigaGiustificativo)
												jsonStringGiust = btoa(jsonStringGiust)

												tabellaGiust += "<tr>"

												tabellaGiust += "<td>"
												tabellaGiust += rigaGiustificativo.nomeSoggetto
												tabellaGiust += "</td>"																								

												tabellaGiust += "<td>"
												tabellaGiust += rigaGiustificativo.idDocumento
												tabellaGiust += "</td>"
												
												tabellaGiust += "<td>"
												tabellaGiust += rigaGiustificativo.descrizione
												tabellaGiust += "</td>"
												tabellaGiust += "<td>"
												tabellaGiust += rigaGiustificativo.dataEmissione
												tabellaGiust += "</td>"
												tabellaGiust += "<td>"
												tabellaGiust += parseFloat(rigaGiustificativo.importo).toFixed(2) + " MNC"
												tabellaGiust += "</td>" 

												if(status == -1 ){
													tabellaGiust += "<td>"
													tabellaGiust += "<img src=" + key + " width=\"30\" height=\"30\">"
													tabellaGiust += "</td>"

												}else{
													if(status == 0){
														tabellaGiust += "<td>"
														tabellaGiust += "<a href=\"/pagamenti?giustificativo=" 
															+ jsonStringGiust + "\"><img src=" + mnc + " width=\"30\" height=\"30\"></a>"
														tabellaGiust += "</td>"
													}else{
														tabellaGiust += "<td>"
														tabellaGiust += "<img src=" + spunta + " width=\"30\" height=\"30\">"
														tabellaGiust += "</td>"
													}
												}

												tabellaGiust += "</tr>"
												index++;
											}
										)

									
									document.getElementById("tabellaGiust").innerHTML = tabellaGiust;
				                	});
				            	}
				              }}>
				                Vedi Giustificativi
				  </button>
				  </form>
				  <br/>

				  <table id="tabellaGiust" className="table" >
			    
				  </table>
	      </div>
    	)

    	
  	}
  }
}

export default GiustView;
