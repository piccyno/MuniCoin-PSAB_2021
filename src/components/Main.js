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
