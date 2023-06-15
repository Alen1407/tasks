import numpy as np
import PyPDF2
import re


# function to process the pdf file
def process_pdf(path):

    # reading the pdf file
    pdfFileObj = open(path, 'rb')
    pdfReader = PyPDF2.PdfReader(pdfFileObj)
    pdfText = ""

    for page in pdfReader.pages:
        pdfText += page.extract_text()

    pdfFileObj.close()

    # reading the helper file
    helper = open("words_alpha.txt")
    words = helper.read()
    helper_array = np.array(words.split("\n"))
    helper.close()

    # finding all the words in the pdf and writing in an numpy array
    words = re.findall(r'\b\w+\b', pdfText)
    arr = np.array(list(words))

    # checking if the word is a real word
    pattern = r'^[a-zA-Z]+$'
    is_word = np.vectorize(lambda x: bool(re.match(pattern, x)))

    # normalizing the words by making it all lower case and unique
    words_arr = arr[is_word(arr)]
    lower_arr = np.char.lower(words_arr)
    unique_arr = np.unique(lower_arr)

    # finding the intersection between the unique words and the helper array
    filtered_arr = np.intersect1d(unique_arr, helper_array)

    return filtered_arr