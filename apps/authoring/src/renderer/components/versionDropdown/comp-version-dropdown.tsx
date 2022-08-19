import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './comp-version-dropdown.scss';

export const VersionDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className="nav-item dropdown scrowl-versions">
      <button
        className={`nav-link dropdown-toggle badge ${showMenu ? 'show' : ''}`}
        data-bs-toggle="dropdown"
        onClick={() => setShowMenu(!showMenu)}
        aria-expanded="false"
      >
        v7
      </button>
      <ul
        className={`dropdown-menu scrowl-versions__menu ${
          showMenu ? 'show' : ''
        }`}
      >
        <li className="dropdown-header">Version History</li>
        <li>
          <table className="table table-hover">
            <thead className="visually-hidden">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>
                  <span className="material-symbols-rounded">sync</span>
                </td>
                <td>Unsaved changes</td>
                <td>Ann Perkins</td>
              </tr>
              <tr>
                <td>v7</td>
                <td>Today, 9:42 AM</td>
                <td>Tom Haverford</td>
              </tr>
              <tr>
                <td>v6</td>
                <td>Yesterday, 9:30 PM</td>
                <td>Tom Haverford</td>
              </tr>
              <tr>
                <td>v5</td>
                <td>Yesterday, 11:30 AM</td>
                <td>Tom Haverford</td>
              </tr>
              <tr>
                <td>v4</td>
                <td>Yesterday, 10:24 AM</td>
                <td>Tom Haverford</td>
              </tr>
              <tr>
                <td>v3</td>
                <td>July 18, 1:58 PM</td>
                <td>Leslie Knope</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            See More History...
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default {
  VersionDropdown,
};
