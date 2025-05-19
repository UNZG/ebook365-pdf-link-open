// ==UserScript==
// @name         Ebook365 PDF Link Open
// @namespace    Violentmonkey Scripts
// @match        https://ebook365.vn/*
// @grant        none
// @version      1.0
// @author       Bạn
// @description  Tạo nút mở link PDF từ ảnh thumb-book trên ebook365.vn
// ==/UserScript==

(function() {
    'use strict';

    function createButton(text, top, color, callback) {
        const button = document.createElement('button');
        button.textContent = text;
        Object.assign(button.style, {
            position: 'fixed',
            top: `${top}px`,
            right: '10px',
            zIndex: 10000,
            padding: '10px',
            backgroundColor: color,
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        });
        button.addEventListener('click', callback);
        document.body.appendChild(button);
    }

    function extractPDFLink(type) {
        const img = document.querySelector('img.thumb-book');
        if (!img) {
            alert('Notfound Link');
            return null;
        }

        const original = img.getAttribute('data-original') || img.src;
        if (!original) {
            alert('Not Found');
            return null;
        }

        const replaced = original.replace('img.book', 'ebook_pdf');
        const pdfLink = replaced.replace(/\.jpg.*$/, `_${type}.pdf`);
        return pdfLink;
    }

    function openLink(type) {
        const link = extractPDFLink(type);
        if (link) window.open(link, '_blank');
    }

    createButton('Open 1', 10, '#4CAF50', () => openLink(1));
    createButton('Open 2', 60, '#007BFF', () => openLink(2));
    createButton('Open All', 110, '#FF5733', () => {
        openLink(1);
        openLink(2);
    });

})();
