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
import Comune from '../logo_cagliari.svg'

import mnc from '../MuniCoin.png'
import { BrowserRouter, Route} from "react-router-dom";


/**
 * 
 * Classe per la barra di navigazione
 * 
 */
class Navbar extends Component {

  render() {
	  
	const Separator = () => <span> &middot; </span>; 
	
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="https://people.unica.it/michelemarchesi/didattica/insegnamenti/?mu=Guide/PaginaADErogata.do?ad_er_id=2020*N0*N0*S2*34907*20732&ANNO_ACCADEMICO=2020&mostra_percorsi=S&step=1&jsid=59A6F4537B296E9B1FDFA65EC55EE81C.esse3-unica-prod-02"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Comune} width="45" height="45" className="d-inline-block align-top" alt="" />
          &nbsp; MuniCoin 
        </a>
	
		
			 <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/accreditamento"
         
          rel="noopener noreferrer"
        >
				Accreditamento 
				         
				</a>
		
		
		
		 		<a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/aggiungiGiustificativi"
         
          rel="noopener noreferrer"
	        >
				Aggiungi giustificativi
				         
				</a>
				
				<a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/visualizzaGiustificativi"
         
          rel="noopener noreferrer"
        >
		Visualizza giustificativi
		</a>
	
			


			<a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/saldo"
         
          rel="noopener noreferrer"
        >
				Saldo 
				         
				</a>
	
	
        <ul className="navbar-nav px-3">
	
        </ul>
      </nav>
    );
  }
}

export default Navbar;
