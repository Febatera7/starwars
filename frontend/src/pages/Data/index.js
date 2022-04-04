import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/star-wars-2.svg';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './style.css';

export default function Data() {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const [selectedPage, setSelectedPage] = useState(1);

    const data = JSON.parse(localStorage.getItem('data'));
    const results = data.results;
    const numberOfPages = data.numberOfPages;

    const name = localStorage.getItem('name');
    const choice = localStorage.getItem('choice');
    const history = useHistory();

    async function handlePage(page) {
        try {
            const body = { filter: choice, page: page };
            const response = await api.post(`getAllFromSpecificTheme`, body, config);
            localStorage.setItem('data', JSON.stringify(response.data));
            setSelectedPage(page)
            history.push('/data');
        } catch (err) {
            alert('Session expired, please login again');
            handleLogout();
        }
    };

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className='data-container'>
            <header>
                <img src={logoImg} alt="StarWars" onClick={() => history.push('/home')} />
                <span>Welcome, {name}</span>
                <button type="button">
                    <FiPower size={18} color="#ffffff" onClick={handleLogout} />
                </button>
                <Link className="back-link" to="/home">
                    <FiArrowLeft />
                    Go Back
                </Link>
            </header>
            <h1>List of {choice}</h1>
            <ul>
                {results.map((result) => {
                    return <li>
                        <strong>Name: </strong>
                        <p>{result.name}</p>
                        <strong>Height: </strong>
                        <p>{result.height} cm</p>
                        <strong>Mass: </strong>
                        <p>{result.mass} Kg</p>
                        <strong>Hair Color: </strong>
                        <p>{result.hair_color}</p>
                        <strong>Skin Color: </strong>
                        <p>{result.skin_color}</p>
                        <strong>Eye Color: </strong>
                        <p>{result.eye_color}</p>
                        <strong>Birth Year: </strong>
                        <p>{result.birth_year}</p>
                        <strong>Gender: </strong>
                        <p>{result.gender}</p>
                    </li>
                })}
            </ul>
            <div className='pagination'>
                <h3>Pages</h3>
                <ul>
                    {console.log(numberOfPages)}
                    {numberOfPages.map(page => {
                        return <li>
                            <a
                                className={page === selectedPage ? 'active' : 'notActive'}
                                value={page}
                                onClick={() => handlePage(page)}
                            >{page}</a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}