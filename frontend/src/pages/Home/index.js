import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'
import logoImg from '../../assets/star-wars-2.svg';
import peopleImg from '../../assets/luke.jpg';
import vehiclesImg from '../../assets/at-at.jpg';
import planetsImg from '../../assets/taris.jpg';
import speciesImg from '../../assets/wookie.jpg';
import starshipsImg from '../../assets/x-wing.jpg';
import filmsImg from '../../assets/star-wars-movies.jpg';
import { FiPower } from 'react-icons/fi';
import api from '../../services/api';

export default function Home() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const history = useHistory();

    async function handleChoice(choice) {
        try {
            const body = { filter: choice, page: 1 };
            const response = await api.post(`getAllFromSpecificTheme`, body, config);
            localStorage.setItem('data', JSON.stringify(response.data));
            localStorage.setItem('choice', choice);

            history.push('/data');
        } catch (err) {
            alert('Session expired, please login again');
            handleLogout();
        }
    };

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    };

    return (
        <div className="home-container">
            <header>
                <img src={logoImg} alt="StarWars" />
                <span>Welcome, {name}</span>
                <button type="button">
                    <FiPower size={18} color="#ffffff" onClick={handleLogout} />
                </button>
            </header>
            <h1>Choose the theme</h1>
            <ul>
                <li>
                    <img
                        className='home-images'
                        src={filmsImg}
                        alt="Films"
                        onClick={() => alert('Sorry. :( But soon we will have more data to show you ;)')}
                    />
                    <span>Films(Soon)</span>
                </li>
                <li>
                    <img
                        className='home-images'
                        src={peopleImg}
                        alt="People"
                        onClick={() => handleChoice('people')}
                    />
                    <span>People</span>
                </li>
                <li>
                    <img
                        className='home-images'
                        src={speciesImg}
                        alt="Species"
                        onClick={() => alert('Sorry. :( But soon we will have more data to show you ;)')}
                    />
                    <span>Species(Soon)</span>
                </li>
                <li>
                    <img
                        className='home-images'
                        src={planetsImg}
                        alt="Planets"
                        onClick={() => alert('Sorry. :( But soon we will have more data to show you ;)')}
                    />
                    <span>Planets(Soon)</span>
                </li>
                <li>
                    <img
                        className='home-images'
                        src={vehiclesImg}
                        alt="Vehicles"
                        onClick={() => alert('Sorry. :( But soon we will have more data to show you ;)')}
                    />
                    <span>Vehicles(Soon)</span>
                </li>
                <li>
                    <img
                        className='home-images'
                        src={starshipsImg}
                        alt="Starships"
                        onClick={() => alert('Sorry. :( But soon we will have more data to show you ;)')}
                    />
                    <span>Starships(Soon)</span>
                </li>
            </ul>
        </div>
    )
}