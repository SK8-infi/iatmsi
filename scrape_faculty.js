import https from 'https';
https.get('https://www.iiitm.ac.in/index.php/en/faculty-profiles', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const names = ['Sri Niwas Singh', 'Manisha Pattanaik', 'Vinay Singh', 'Pinku Ranjan', 'Vijaypal', 'Rohit Kumar', 'Neelesh Yadav'];
    names.forEach(name => {
      // Very loose regex to find href and img src nearby
      const nameParts = name.split(' ');
      const regex = new RegExp('<div[^>]*>\\s*<img[^>]*src=\"([^\"]*)\"[^>]*>\\s*</div>\\s*<div[^>]*>\\s*<h4[^>]*>\\s*<a[^>]*href=\"([^\"]*)\"[^>]*>\\s*(?:Prof\\.?|Dr\\.?\\s*)?' + nameParts[0], 'i');
      const match = data.match(regex);
      if(match) console.log(name, '-> img:', match[1], 'url:', match[2]);
      else {
        // try finding just the link
        const linkRegex = new RegExp('<img[^>]*src=\"([^\"]*)\"[^>]*>.*<a[^>]*href=\"([^\"]*)\"[^>]*>\\s*[^<]*?' + nameParts[0], 'is');
        const linkMatch = data.match(linkRegex);
        if (linkMatch) {
            console.log(name, '-> img approx:', linkMatch[1], 'url:', linkMatch[2]);
        } else {
             const linkRegex2 = new RegExp('<a[^>]*href=\"([^\"]*)\"[^>]*>\\s*[^<]*?' + nameParts[0], 'is');
             const linkMatch2 = data.match(linkRegex2);
             console.log(name, '-> url approx:', linkMatch2 ? linkMatch2[1] : 'NOT FOUND');
        }
      }
    });
  });
}).on('error', err => console.error(err.message));
