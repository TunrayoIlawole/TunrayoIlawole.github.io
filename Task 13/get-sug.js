const domElements5 = {
    categoryCon: document.getElementById('category'),
    itemsCon: document.querySelector('.items-con'),
    noItems: document.querySelector('h2')
}

const fetchSuggestions = (category = '') => {
    window.makeRequest.get(`/suggested${category}`)
      .then(response => {
        const suggestions = response.data;
        console.log(suggestions);

        // display suggestions
        suggestions.forEach(suggestion => {
          const item = document.createElement('div');
          item.classList.add("item");

          const heading = document.createElement("h3");
          heading.textContent = suggestion.item_category;

          const itemDetails = document.createElement("div");
          itemDetails.classList.add("item-details");

          const itemHeadings = document.createElement("div");
          itemHeadings.classList.add("item-headings");

          const headingOne = document.createElement("p");
          headingOne.textContent = "Name:";
          const headingTwo = document.createElement("p");
          headingTwo.textContent = "Desc:";
          const headingThree = document.createElement("p");
          headingThree.textContent = "Reason:";

          itemHeadings.appendChild(headingOne);
          itemHeadings.appendChild(headingTwo);
          itemHeadings.appendChild(headingThree);

          const itemDes = document.createElement("div");
          itemDes.classList.add("item-nouns");

          const detailOne = document.createElement("p");
          detailOne.textContent = `${suggestion.item_name}`;
          const detailTwo = document.createElement("p");
          detailTwo.textContent = `${suggestion.item_description}`;
          const detailThree = document.createElement("p");
          detailThree.textContent = `${suggestion.reason}`;

          itemDes.appendChild(detailOne);
          itemDes.appendChild(detailTwo);
          itemDes.appendChild(detailThree);

          itemDetails.append(itemHeadings);
          itemDetails.append(itemDes);

          item.append(heading);
          item.append(itemDetails);

          domElements5.itemsCon.append(item);

        });

        if (suggestions.length === 0) {
          domElements5.noItems.classList.add('show');
        }
        else {
          domElements5.noItems.classList.remove('show');
        }

      });
};