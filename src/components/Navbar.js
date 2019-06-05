import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="/">
                            <p className="nav_header">React D3 PieCharts</p>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar;