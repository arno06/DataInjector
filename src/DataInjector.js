/**
 * @author Arnaud NICOLAS <arno06@gmail.com>
 */
var DataInjector =
{
	fill:function(pParent, pData)
	{
		pParent.querySelectorAll('span[data-source]').forEach(function(pElement)
		{
			pElement.innerHTML = DataInjector._retrieveValue(pElement, pData);
		});
	},
	iterate:function(pTable, pData, pFirst, pLast, pEmpty)
	{
		if(!pLast)
		{
			pLast = 0;
			for(var l in pData)
				pLast++;
		}
		pFirst = pFirst||0;
		pTable.querySelector('tbody').classList.remove('empty');
		var head = pTable.querySelectorAll('thead tr th');
		var tbody = "";
		var item;
		var iterator = -1;
		for(var i in pData)
		{
			iterator++;
			if(iterator<pFirst || iterator>=pLast)
			{
				continue;
			}
			if(!pData.hasOwnProperty(i))
				continue;
			item = pData[i];
			tbody += "<tr data-idx='"+i+"'>";

			head.forEach(function(pTh){
				var name = pTh.getAttribute("data-source")||"";
				if(name.indexOf('.')>-1)
				{
					tbody += "<td class='"+name.split('.')[0]+"'>";
				}
				else
					tbody += "<td class='"+name+"'>";
				tbody += DataInjector._retrieveValue(pTh, item)+"</td>";
			});

			tbody += "</tr>";
		}
		if(iterator == -1)
		{
			pEmpty = pEmpty||"Vide";
			tbody += "<tr><td colspan='"+head.length+"'>"+pEmpty+"</td></tr>";
			pTable.querySelector('tbody').classList.add('empty');
		}
		pTable.querySelector('tbody').innerHTML = tbody;
	},
	_retrieveValue:function(pSource, pData)
	{
		var name = pSource.getAttribute("data-source")||"";
		var modifier = pSource.getAttribute("data-modifier")||"";
		var value = "";
		if(name === "{value}")//wildCard
		{
			value = pData;
		}
		else if(name.indexOf('.')>-1)
		{
			name = name.split('.');
			if(pData[name[0]]&&(pData[name[0]][name[1]] != undefined))
			{
				value = pData[name[0]][name[1]];
			}
		}
		else
			value = pData[name]||"";
		if(DataInjector._modifiers[modifier])
			return DataInjector._modifiers[modifier](value);
		return value;
	},
	_modifiers:{
		stringToDate:function(pString)
		{
			return pString.substr(0, 2)+"/"+pString.substr(2, 2)+"/"+pString.substr(4, 4);
		}
	}
};