# -*- coding: utf-8 -*-
#
# Copyright (C) 2012 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Command-line skeleton application for YouTube Data API.
Usage:
  $ python sample.py

You can also get help on all the command-line flags the program understands
by running:

  $ python sample.py --help

To get detailed log output run:

  $ python sample.py --logging_level=DEBUG
"""

import gflags
import httplib2
import logging
import os
import pprint
import sys

from apiclient.discovery import build
from oauth2client.file import Storage
from oauth2client.client import AccessTokenRefreshError
from oauth2client.client import flow_from_clientsecrets
from oauth2client.tools import run

from optparse import OptionParser

import json

FLAGS = gflags.FLAGS

# CLIENT_SECRETS, name of a file containing the OAuth 2.0 information for this
# application, including client_id and client_secret.
# You can see the Client ID and Client secret on the API Access tab on the
# Google APIs Console <https://code.google.com/apis/console>
CLIENT_SECRETS = 'client_secrets.json'

# Helpful message to display if the CLIENT_SECRETS file is missing.
MISSING_CLIENT_SECRETS_MESSAGE = """
WARNING: Please configure OAuth 2.0

To make this sample run you will need to download the client_secrets.json file
and save it at:

   %s

""" % os.path.join(os.path.dirname(__file__), CLIENT_SECRETS)

# Set up a Flow object to be used for authentication.
# Add one or more of the following scopes. PLEASE ONLY ADD THE SCOPES YOU
# NEED. For more information on using scopes please see
# <https://developers.google.com/+/best-practices>.
FLOW = flow_from_clientsecrets(CLIENT_SECRETS,
    scope=[
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube',
#      'https://www.googleapis.com/auth/youtubepartner',
 #     'https://www.googleapis.com/auth/youtube.upload',
    ],
    message=MISSING_CLIENT_SECRETS_MESSAGE)


# The gflags module makes defining command-line options easy for
# applications. Run this program with the '--help' argument to see
# all the flags that it understands.
gflags.DEFINE_enum('logging_level', 'ERROR',
    ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
    'Set the level of logging detail.')


#def main(argv):
  # Let the gflags module process the command-line arguments
#  try:
#    argv = FLAGS(argv)
#  except gflags.FlagsError, e:
#    print '%s\\nUsage: %s ARGS\\n%s' % (e, argv[0], FLAGS)
#    sys.exit(1)

  # Set the logging according to the command-line flag
#  logging.getLogger().setLevel(getattr(logging, FLAGS.logging_level))

# define search function
def youtube_search(options):

  # If the Credentials don't exist or are invalid, run through the native
  # client flow. The Storage object will ensure that if successful the good
  # Credentials will get written back to a file.
  storage = Storage('sample.dat')
  credentials = storage.get()

  if credentials is None or credentials.invalid:
    credentials = run(FLOW, storage)

  # Create an httplib2.Http object to handle our HTTP requests and authorize it
  # with our good Credentials.
  http = httplib2.Http()
  http = credentials.authorize(http)



  youtube = build('youtube', 'v3', http=http)

  search_response = youtube.search().list(
	q=options.q,
	part="id,snippet", #topicDetails give freebase topic IDs
	maxResults=options.maxResults
  ).execute()

# initialize variables
  results = []

# sort results
  for search_result in search_response.get("items", []):
	if search_result["id"]["kind"] == "youtube#video":
	  results.append(search_result)

# display results to standard out
#  print "JSON:\n\n", json.dumps(results, sort_keys=True, indent=2), "\n"

# log video results to ... database directly or into a portable format
  outFile = open('/home/zkevin/Documents/Sp13/webJournalism/workspace/scraper/results/' + options.q + '.json', 'a+')
  outFile.write(json.dumps(results, separators=(',',':')))
  outFile.close()




#if __name__ == '__main__':
#  main(sys.argv)

# -----------------------------------------------------
# main program
if __name__ == "__main__":
  parser = OptionParser()
  parser.add_option("--q", dest="q", help="Search term",
	default="Google")
  parser.add_option("--max-results", dest="maxResults",
	help="Max results", default=25)
  (options, args) = parser.parse_args()

  try:
  
    youtube_search(options)

  except AccessTokenRefreshError:
    print ("The credentials have been revoked or expired, please re-run"
      "the application to re-authorize")
