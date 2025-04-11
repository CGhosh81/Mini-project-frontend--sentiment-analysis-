# Flipkart Product Review Sentiment Analysis
This project analyzes customer reviews from Flipkart using sentiment analysis techniques powered by deep learning. It helps users evaluate product quality by classifying reviews as positive, neutral, or negative, saving time and aiding better purchasing decisions.

## Project Objective
To automate the analysis of Flipkart product reviews and:

Classify sentiment (positive/neutral/negative)

Provide purchase recommendations

Help users avoid low-quality products

## Technologies Used
### Backend
Python: Core programming

BeautifulSoup4: Web scraping

Flask: API creation

### Deep Learning / NLP
BERT (Bidirectional Encoder Representations from Transformers)

RNN, LSTM, BiLSTM (with Glove, Word2Vec, Doc2Vec embeddings)

TensorFlow GPU: Model training acceleration

NLTK, spaCy: Text preprocessing

### Frontend
HTML, CSS, JavaScript: UI for link submission and result visualization

## Models Compared
Model	Embedding	Accuracy	Validation Accuracy	Conclusion
RNN	Glove	40%	40%	Underfit
LSTM	Glove	41%	40%	Underfit
BiLSTM	Glove	92%	90%	Good paper accuracy, weak test performance
BiLSTM	Doc2Vec	94%	91%	High accuracy, but biased
BERT	BERT	96.96%	91.03%	Best performance overall ✅
## Methodology
Web Scraping
Scrapes reviews from Flipkart using requests and BeautifulSoup4 with pagination and error handling.

Data Preprocessing
Cleans text, handles emojis, tokenizes, removes stopwords, and stems/lemmatizes.

Model Training
Compared multiple deep learning models. BERT gave the most consistent results on test data.

Output

Summary of sentiment (Positive/Neutral/Negative)

