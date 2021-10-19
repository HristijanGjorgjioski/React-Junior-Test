import React, { Component } from 'react';

import pageNotFoundImage from '../../assets/page-not-found.png';
import './styles.scss';

export class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <img src={pageNotFoundImage} className="page-not-found__image" alt="404 - page not found" />
                <button onClick={() => window.history.back()} className="page-not-found__btn">TAKE ME BACK</button>
            </div>
        )
    }
}

export default PageNotFound
