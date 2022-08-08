'use strict'

const quoteContainer = document.querySelector('.quote');
const quoteText = document.querySelector('.quote-itself');
const quoteAuthor = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.buttons__new-quote');
const loader = document.querySelector('.loader');



let apiQuotes = [];

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function completeLoading() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

function newQuote() {
	loading();
	const quote = apiQuotes[Math.trunc(Math.random() * (apiQuotes.length)) + 1];
	quoteAuthor.textContent = quote.author ? quote.author : 'Unknown';

	if (quote.text.length > 100) quoteText.classList.add("long-quote");
	else quoteText.classList.remove("long-quote");
	quoteText.textContent = quote.text;
	completeLoading();
};

async function getQuotes() {
	loading();
	const apiURL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch('https://type.fit/api/quotes');
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
	}
}

function tweetQuote() {
	const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
	window.open(twitterURL, '_blank');
};

twitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', newQuote);


getQuotes();