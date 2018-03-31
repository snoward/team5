/* eslint-disable */
import React, { Component } from 'react';

export default function ContactList({ contacts }) {
    return <div className='contact-container'>
        {contacts.map(elem => {
            return (<div className='contact'>
                <div className='avatar-container'>
                    <img src={elem.avatar} alt='Avatar' />
                </div>
                <div className='contact-name'>
                    {elem.name}
                </div>
            </div>);
        }
        )}
        <style jsx>{`
                .contact-container
                {
                    position: fixed;
                    overflow-y: auto;
                    margin-top: 70px;
                    margin-left: 20px;
                    margin-bottom: 100px;
                    float: left;
                    width: 40%;
                    height: 80%;
                }
                .contact
                {
                    margin-top: 10px;
                    width: 90%;
                    height: 100px;
                    background-color: rgba(255,255,255,0.9);
                    box-shadow: inset 0px 0px 0px #e5e5e5, inset 0px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
                }
                
                .avatar-container img
                {
                    margin-left: 10px;
                    margin-top: -5px;
                    width: 100px;
                    height: 100px;
                    border-radius: 60%;
                }
                
                .contact-name
                {
                    text-align: center;
                    margin-top: -50px;
                    margin-left: 20px;
                    font-family: Arial, serif;
                    font-size: 20px;
                }

                a
                {
                    color: rgba(82,179,217,0.9);
                }
                `}</style>
    </div>;
}
