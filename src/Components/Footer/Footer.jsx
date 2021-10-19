import React, { Component } from 'react';

import './styles.scss'

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="copyright">
                    created by: 
                    <a href="mailto:hristijangorgioski503@gmail.com">
                        <strong>Hristijan Gjorgjioski</strong>
                    </a>
                </span>
            </footer>
        )
    }
}

export default Footer;
