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