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

const queryStringParser = require('query-string');

/**
 * 
 * Classe per la pagina Pagamenti
 * 
 */
class PayView extends Component {	

  render() {
	  
	  let queryString = queryStringParser.parse(this.props.location.search);
	  console.log(queryString);
	  var str_giustificativo = queryString.giustificativo
	  const giustificativo = JSON.parse(atob(str_giustificativo))
	  console.log("giustificativo in pagamenti")
	  console.log(giustificativo)

    return (
      <div id="content" className="mt-3">
			<h1> Pagamenti </h1>
				<form className="mb-3" onSubmit={(event) => {
		                event.preventDefault()
		                 // todo: pagamento
					   var account = giustificativo.indirizzo
					   var importo = giustificativo.importo
					   var idGiustificativo = giustificativo.idGiustificativo
					  // importo = window.web3.utils.toWei(importo.toString(), 'Ether')					   				   
					
					   this.props.pagaSoggetto(account, idGiustificativo, importo)
					   
		              }}>
			
		      		<label>Soggetto Accreditato:</label><br/>
		      		<input type="text" id="txtSoggetto" name="txtSoggetto" className="form-control form-control-lg"
							value={giustificativo.nomeSoggetto} disabled required/><br/>

							<label>ID Documento:</label><br/>
		      		<input type="text" id="txtSoggetto" name="txtSoggetto" className="form-control form-control-lg"
							value={giustificativo.idDocumento} disabled required/><br/>

							<label>Indirizzo blockchain soggetto accreditato:</label><br/>
		      		<input type="text" id="txtIndirizzo" name="txtIndirizzo" className="form-control form-control-lg"
							value={giustificativo.indirizzo} disabled required/><br/>
					
							<label>Descrizione</label><br/>
		      		<input type="text" id="txtDescrizione" name="txtDescrizione" className="form-control form-control-lg"
								value={giustificativo.descrizione} disabled required/><br/>
					
							<label>Data</label><br/>
		      		<input type="text" id="txtDataEmissione" name="txtDataEmissione" className="form-control form-control-lg"
							value={giustificativo.dataEmissione} disabled required/><br/>
					
							<label>Importo</label><br/>
		      		<input type="text" id="txtImporto" name="txtImporto" className="form-control form-control-lg" 
							value={parseFloat(giustificativo.importo).toFixed(2)+" MNC"} disabled required/><br/>
							
		          <button type="submit" className="btn btn-primary btn-block btn-lg">Effettua pagamento(MNC)</button>
					  
		    </form>	
      </div>
    );
  }
}

export default PayView;
