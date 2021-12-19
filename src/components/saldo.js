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
 */

import React, { Component } from 'react'

/**
 * 
 * Classe per la pagina Saldo
 * 
 */
class SaldoView extends Component {

  	render() {

		if(this.props.loading){
		  	return(
				<p id="loader" className="text-center">Loading...</p>
		  	)
		}else{
			console.log("account")
			console.log(this.props.account)
			console.log("saldo")
			console.log(this.props.getSaldo(this.props.account))
			var attesaSaldo = this.props.getSaldo(this.props.account)
			var saldo = -1
			attesaSaldo.then(saldo => {
				document.getElementById("saldo").innerHTML = "Il tuo saldo è: " + saldo + " MNC"
			})
			
		    return (
		    	<div id="content" className="mt-3">	    	  	
			      	<h1> Saldo  </h1>
			      	<p>Ciao {this.props.nomeSoggetto(this.props.account)}</p>
			      	<p id="saldo"></p>
					<br/>

		      	</div>
	    	)
	    	
    	
  		}
  	}



}

export default SaldoView;
