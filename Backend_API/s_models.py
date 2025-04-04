
# package use for model call
import numpy as np

from transformers import BertTokenizer, TFBertForSequenceClassification
import tensorflow as tf


##  models path
epoch_3_model_path='api_test/Flipkart_sentiment_analysis/Backend_API/3 epoch sentiment_model'


epoch_8_model_path='api_test/Flipkart_sentiment_analysis/Backend_API/8 epoch sentiment model'



# Load the model and tokenizer from saved directory
model = TFBertForSequenceClassification.from_pretrained(epoch_8_model_path)
tokenizer = BertTokenizer.from_pretrained(epoch_8_model_path)



################################################           Start   model
################### necessary libaries for model
import string


from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

import emoji

ps = PorterStemmer()

###########################          model pre-processing funtion
def is_emoji(token):
    return any(char in emoji.EMOJI_DATA for char in token)

def preprocess_text(text):
    processed = []
    for word in text:
        if is_emoji(word):
            demojized = emoji.demojize(word)
            demojized = demojized.replace(':', ' ').replace('_', ' ')
            processed.append(demojized)
        else:
            processed.append(word)
    return processed
    
def transform_text(text):
    text = text.lower()
    text = word_tokenize(text)
    
    y = []
    for i in text:
        if i.isalnum() or is_emoji(i):
            y.append(i)
    text = preprocess_text(y)
    # text = y[:]
    y.clear()

    for i in text:
        if i and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))  # Fix: Append stemmed word

    return " ".join(y)


########################################################### model prredict function
def predict(text):
    # First transform the text (clean/normalize it)
    processed_text = transform_text(text)
    
    # Then tokenize and make prediction
    inputs = tokenizer(
        processed_text, 
        return_tensors='tf', 
        truncation=True, 
        max_length=128
    )
    outputs = model(inputs)
    probas = tf.nn.softmax(outputs.logits, axis=1)
    y_pred_label = np.argmax(probas)  # This gives the class index (0, 1, or 2)
    
    # Map to class names
    class_names = ['negative', 'neutral', 'positive']
    return class_names[y_pred_label]


##########################  model call function

from tqdm import tqdm  # For progress bar (optional)

def batch_predict_df(df, text_column='review', batch_size=16):
    """
    Batch-wise prediction for DataFrame
    
    Args:
        df: Input DataFrame
        text_column: Name of text column
        batch_size: Number of texts per batch
        
    Returns:
        DataFrame with original data + predictions
    """
    texts = df[text_column].tolist()
    predictions = []
    
    # Process in batches
    for i in tqdm(range(0, len(texts), batch_size), desc="Processing batches"):
        batch_texts = texts[i:i+batch_size]
        
        # Process batch
        batch_preds = [predict(text) for text in batch_texts]
        predictions.extend(batch_preds)
    
    # Add predictions to new DataFrame
    result_df = df.copy()
    result_df['sentiment'] = predictions
    
    return result_df
