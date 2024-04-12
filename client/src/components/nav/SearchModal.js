import React, { useState, useEffect, useRef } from 'react';

import Modal from 'react-modal';

const SearchModal = (props) => {
    const {isOpen, onClick } =props;
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return (

            <Modal
                isOpen={isOpen}
                onRequestClose={onClick}
                className={`offcanvas-tab theme-search-form ${props.bgColor}`}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
                >

                <button className="close-btn" onClick={onClick}><i className="fal fa-times"/></button>
                <div
                    className="offcanvas-tops justify-content-center">
                    <div className="form-wrapper">
                        <form action="#" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Search Keyword...."/>
                        </form>
                    </div>
                    {/* /.form-wrapper */}
                </div>

            </Modal>

    )
}

export default SearchModal
