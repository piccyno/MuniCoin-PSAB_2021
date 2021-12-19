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

/**
 * 
 * Classe per la pagina Accreditamento
 * 
 */
class AccView extends Component {	

  render() {
  	if(this.props.loading){
		  	return(
				<p id="loader" className="text-center">Loading...</p>
		  	)
		}else{
			console.log("account accreditamento")
			console.log(this.props.account)

	    return (

	      <div id="content" className="mt-3">
					<h1> Accreditamento </h1>
					<form className="mb-3" 
						onSubmit={(event) => 
							{
		            event.preventDefault()
						  	var nome = document.getElementById('txtNomeSoggetto').value
						  	var indirizzo = document.getElementById('indirizzoBlockchain').value
						  	var ppKey = document.getElementById('pKey')
						  	var psKey = document.getElementById('sKey')
						  	this.props.aggiungiSoggettoAccreditato(nome, indirizzo, ppKey, psKey)
			        }
			      }>
			
		      	<label>Nome Soggetto Accreditato:</label><br/>
		      	<input type="text" id="txtNomeSoggetto" name="txtNomeSoggetto" 
		      		className="form-control form-control-lg" required/>

		      	<label>Indirizzo blockchain:</label><br/>
		      	<input type="text" id="indirizzoBlockchain" name="indirizzoBlockchain" 
		      		className="form-control form-control-lg" value={this.props.account} required/>

		      	<br/>
		          
		        <button type="submit" className="btn btn-primary btn-block btn-lg">
		        	Accredita soggetto
		        </button>
		      </form>
		      
		      <br/>
		      <br/>
		      <label>Chiave pubblica:</label><br/>
		      <p id="pKey"></p>

		      <label>Chiave privata:</label><br/>
		      <p id="sKey"></p>


	      </div>
	    );
  	}

  }
}

export default AccView;
