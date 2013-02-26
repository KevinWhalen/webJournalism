#!/usr/bin/python

from apiclient.discovery import build
from optparse import OptionParser

import json

# globals
# Set DEVELOPER_KEY to the "API key" value from the "Access" tab of the
# Google APIs Console http://code.google.com/apis/console#access
# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = ""
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"


# define search function
def youtube_search(options):
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)

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

# -----------------------------------------------------
# main program?
if __name__ == "__main__":
  parser = OptionParser()
  parser.add_option("--q", dest="q", help="Search term",
    default="Google")
  parser.add_option("--max-results", dest="maxResults",
    help="Max results", default=25)
  (options, args) = parser.parse_args()

  youtube_search(options)
