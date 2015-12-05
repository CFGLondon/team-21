from random import randint
from nltk.book import text1

def removeStopWords(tokens):
	stopwords = nltk.corpus.stopwords.words('english')

	extraStopWords = ['n\'t','amp','http','...']

	# remove stop words 
	return [w for w in tokens if w not in stopwords and w not in extraStopWords and len(w) > 2]


def lemmatize(tokens):
	wnl = nltk.WordNetLemmatizer()
	
	return [wnl.lemmatize(t) for t in tokens]


x = removeStopWords(text1)

x = lemmatize(x)

fdist = FreqDist(x)

tempDict = dict(fdist.most_common(30))

csvRow = '';
countries = ['Bangladesh','Cambodia','Uganda','Tanzania', 'Sudan']

for x in xrange(0,30):
	i = randint(0,4)
	csvRow += countries[i] + ','

fd = open('unigramsFreqDist.csv','a')
fd.write(csvRow)
fd.close()

rows = [];

import csv
with open('unigramsFreqDist.csv', 'r') as textfile:
    for row in list(csv.reader(textfile)):
        rows.append(row)

# print(rows)

goodCSV = []

for x in xrange(0,29):
	goodCSV.append({'word' : rows[0][x],'count' : rows[1][x],'topic' : rows[2][x],'country' : rows[3][x]})

# print goodCSV

keys = goodCSV[0].keys()
with open('correct.csv', 'wb') as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(goodCSV)

# # print fdist1.most_common()