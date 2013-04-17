//--------------------------------------------------------------------
	// Data from journalist research.
	// name = name of website
	// icon = displayed circle (SVG file)
	// category = 3 defined (0,1,2)
	//		shape = displayed representation of category (needed?) (dia,sq,tri)
	//		rating = designation from -5 through 5
	//		title = category title text
	//		text = write up on 'category' for 'title'

	// yes, shape and title are repetitive

window.researchData = 
[
	{"name": "Facebook", "icon": "images/icons/facebook.svg", "category":
		[
		{"shape": "diamond", "rating": 5, "text": "Facebook has teamed up with the National Suicide Prevention Hotline to provide a Facebook Help section that's specifically aimed at suicide watch.  The tab provides links like 'I need to find a suicide hotline for myself or a friend' and 'how do I help someone who's posted suicidal content on Facebook?' Most advise you call law enforcement first.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": 5, "text": "The partnership with the National Suicide Prevention Hotline makes Facebook the most proactive site acting against suicide.", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": 2, "text": "The only problem is 'suicide' is the only search term that prompts the 'Facebook Help: Suicide' link. All the other suggestions involve 'suicide girls,' who are edgy pin-ups.", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "Twitter", "icon": "images/icons/twitter.svg", "category":
		[
		{"shape": "diamond", "rating": 0, "text": "They are buried in the excess of sarcastic posts about suicide.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": 0, "text": "Twitter's 140-character rule usually results in a lot of senseless, sarcastic posts. A search for 'suicide' is much of the same.", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": 0, "text": "Though a top hit was the American Foundation for Suicide Prevention's twitter account, most of the hash tags and mentions of the word were in a sarcastic, joking context. For example, 'So much homework tonight, ugh. #suicide.'", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "Tumblr", "icon": "images/icons/tumblr.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "None apparent.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": -4, "text": "Hashtags like #selfharm, #sad, #suicidal and #depressed are all over. I had to search hard to find one link to a suicide help page.", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": -5, "text": "All results that show up after typing in 'suicide' are pro-suicide. Photos showing a girl with cut marks on her arm and the words, 'It feels so good to give up,' are the majority.", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "WordPress", "icon": "images/icons/wordpress.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "None apparent.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": 1, "text": "Suicide posts are either memorials, warnings, or suicidal thoughts. ", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": 3, "text": "People who post about suicide do so in a more professional anecdotal format on this site. Most posts are about loved ones who have attempted gone through with suicide.", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "Reddit", "icon": "images/icons/reddit.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "None apparent.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": -5, "text": "The forum-style discussions of suicide on this site glorify and make light of suicide. ", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": -4, "text": "The forums on this site pose questions like, 'What would you do on your last day?' The second top hit is the forum 'Am I wrong for thinking that suicide should be a fundamental human right?'", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "Pinterest", "icon": "images/icons/pinterest.svg", "category":
		[
		{"shape": "diamond", "rating": -5, "text": "None apparent.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": 0, "text": "This site is neither helpful nor harmful in regard to suicide.", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": 0, "text": "Most posts are about the 'suicide girls,' edgy pinup girls, and suicide in pop culture, like the movie, 'The Virgin Suicides.'", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	},
	{"name": "YouTube", "icon": "images/icons/youtube.svg", "category":
		[
		{"shape": "diamond", "rating": 5, "text": "If you type in any variation of 'suicide' or 'kill myself,' 'Need help? In the U.S., call 1-800-273-8255' is always the first result on the page.", 
      "file": "images/icons/diamond.svg", "title": "Is helpline info apparent?"},
		{"shape": "square", "rating": 3, "text": "Suicide help info is readily available. Most videos are informative news stories about suicide.", 
      "file": "images/icons/square.svg", "title": "What’s the tone of the site?"},
		{"shape": "triangle", "rating": 2, "text": "News stories about suicide make up the majority of the search results here.", 
      "file": "images/icons/triangle.svg", "title": "Do the top hits yield helpful, positive info?"}
		]
	}
];
