/* eslint-disable */
import React, { Component } from 'react';

export default function Menu({ menu }) {
    return <div className='menu'>
        <div className='back'>
            <i className='fa fa-chevron-left'></i>
            <img src={menu.avatar} draggable='false' />
        </div>
        <div className='name'>{menu.name}</div>
        <div className='last'>{menu.time}</div>
        <style jsx>{`
                @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
                .menu {
                    position: fixed;
                    top: 0;
                    left: 0px;
                    right: 0px;
                    width: 100%;
                    height: 50px;
                    background: coral;
                    z-index: 100;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                
                .back {
                    position: absolute;
                    width: 90px;
                    height: 50px;
                    top: 0px;
                    left: 0px;
                    color: #fff;
                    line-height: 50px;
                    font-size: 30px;
                    padding-left: 10px;
                    cursor: pointer;
                }
                .back img {
                    position: absolute;
                    top: 5px;
                    left: 30px;
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255,255,255,0.98);
                    border-radius: 100%;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    -ms-border-radius: 100%;
                    margin-left: 15px;
                }
                .back:active {
                    background: rgba(255,255,255,0.2);
                }
                .name{
                    position: absolute;
                    top: 3px;
                    left: 110px;
                    font-family: 'Lato';
                    font-size: 25px;
                    font-weight: 300;
                    color: rgba(255,255,255,0.98);
                    cursor: default;
                }
                .last{
                    position: absolute;
                    top: 30px;
                    left: 115px;
                    font-family: 'Lato';
                    font-size: 11px;
                    font-weight: 400;
                    color: rgba(255,255,255,0.6);
                    cursor: default;
                }
                a{
                    color: rgba(82,179,217,0.9);
                }
                `}</style>
    </div>;
}
