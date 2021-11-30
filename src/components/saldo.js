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