var _searcher;
var nbsearchers;

function setmenu()
{
	chrome.contextMenus.removeAll();
	
	if(set==null)
	{	
		_searcher = new Array(2);
		
		_searcher[0] = new Array(3);
		_searcher[0][1] = "Artist";
		_searcher[0][2] = "https://what.cd/torrents.php?artistname=TESTSEARCH&order_by=time&order_way=desc&group_results=1&filter_cat%5B1%5D=1&action=advanced&searchsubmit=1";

		_searcher[1] = new Array(3);
		_searcher[1][1] = "Album";
		_searcher[1][2] = "https://what.cd/torrents.php?groupname=TESTSEARCH&order_by=time&order_way=desc&group_results=1&filter_cat%5B1%5D=1&action=advanced&searchsubmit=1";
		
		nbsearchers = 2;
		
		var set = 1;	
	}

	for(var i=0; i<nbsearchers; i++)
	{
		_searcher[i][0] = chrome.contextMenus.create({"title": _searcher[i][1], "contexts":["selection"], "onclick": searchfor});
	}
}

function searchfor(info, tab) 
{
	var index = 0;
	for(var i=0; i<nbsearchers; i++)
	{
		if(info.menuItemId == _searcher[i][0])
		{
			index = i;
		}
	}
	
	var targetURL = _searcher[index][2].replace("TESTSEARCH", info.selectionText);
	targetURL = targetURL.replace("%s", info.selectionText);
	
	chrome.tabs.create({"url":targetURL});
}

setmenu();
