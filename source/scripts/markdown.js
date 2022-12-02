/**
 * drawdown.js
 * (c) Adam Leggett
 * Initial code taken from https://github.com/adamvleggett/drawdown and linted and modified by Alex
 */

export default function markdown(src) {
  let ret = src;
  const regexLessThan = /</g;
  const regexGreaterThan = />/g;
  const regexSpace = /\t|\r|\uf8ff/g;
  const regexEscape = /\\([\\|`*_{}[\]()#+\-~])/g;
  const regexHorizontalRule = /^([*\-=_] *){3,}$/gm;
  const regexBlockQuote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
  const regexList = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
  const regexListJoin = /<\/(ol|ul)>\n\n<\1>/g;
  const regexHighlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
  const regexCode = /\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g;
  const regexLink = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}[\]()#+\-.!~]))/g;
  const regexTable = /\n(( *\|.*?\| *\n)+)/g;
  const regexTableHead = /^.*\n( *\|( *:?-+:?-+:? *\|)* *\n|)/;
  const regexRow = /.*\n/g;
  const regexCell = /\||(.*?[^\\])\|/g;
  const regexHeading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
  const regexParagraph = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
  const regexStash = /-\d+\uf8ff/g;

  function replace(rex, fn) {
    ret = ret.replace(rex, fn);
  }

  function element(tag, content) {
    return `<${tag}>${content}</${tag}>`;
  }

  function highlight(s) {
    return s.replace(
      regexHighlight,
      (all, _, p1, emp, sub, sup, small, big, p2, content) => {
        let elem;
        if (emp) {
          if (p2) {
            elem = 'strong';
          } else {
            elem = 'em';
          }
        } else if (sub) {
          if (p2) {
            elem = 's';
          } else {
            elem = 'sub';
          }
        } else if (sup) {
          elem = 'sup';
        } else if (small) {
          elem = 'small';
        } else if (big) {
          elem = 'big';
        } else {
          elem = 'code';
        }
        return _ + element(elem, highlight(content));
      }
    );
  }

  function blockquote(s) {
    return s.replace(regexBlockQuote, (all, content) => element(
      'blockquote',
      blockquote(highlight(content.replace(/^ *&gt; */gm, '')))
    ));
  }

  function list(s) {
    return s.replace(regexList, (all, ind, ol, num, low, content) => {
      const entry = element(
        'li',
        highlight(
          content
            .split(RegExp(`\n ?${ind}(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +`, 'g'))
            .map(list)
            .join('</li><li>')
        )
      );

      return `\n${
        ol
          ? `<ol start="${
            num
              ? `${ol}">`
              : `${parseInt(ol, 36) - 9}" style="list-style-type:${
                low ? 'low' : 'upp'
              }er-alpha">`
          }${entry}</ol>`
          : element('ul', entry)
      }`;
    });
  }

  function unesc(str) {
    return str.replace(regexEscape, '$1');
  }

  const stash = [];
  let si = 0;

  ret = `\n${ret}\n`;

  replace(regexLessThan, '&lt;');
  replace(regexGreaterThan, '&gt;');
  replace(regexSpace, '  ');

  // blockquote
  ret = blockquote(ret);

  // horizontal rule
  replace(regexHorizontalRule, '<hr/>');

  // list
  ret = list(ret);
  replace(regexListJoin, '');

  // code
  replace(regexCode, (all, p1, p2, p3, p4) => {
    si -= 1;
    stash[si] = element(
      'pre',
      element('code', p3 || p4.replace(/^ {4}/gm, ''))
    );
    return `${si}\uf8ff`;
  });

  // link or image
  // Note: for an external link, there needs to be https:// before the link
  replace(regexLink, (all, p1, p2, p3, p4, p5, p6) => {
    si -= 1;
    if (p4) {
      if (p2) {
        stash[si] = `<img src="${p4}" alt="${p3}"/>`;
      } else {
        stash[si] = `<a href="${p4}">${unesc(highlight(p3))}</a>`;
      }
    } else {
      stash[si] = p6;
    }
    return `${si}\uf8ff`;
  });

  // table
  replace(regexTable, (all, table) => {
    const sep = table.match(regexTableHead)[1];
    return `\n${element(
      'table',
      table.replace(regexRow, (row, ri) => (row === sep
        ? ''
        : element(
          'tr',
          row.replace(regexCell, (_all, cell, ci) => (ci
            ? element(
              sep && !ri ? 'th' : 'td',
              unesc(highlight(cell || ''))
            )
            : ''))
        )))
    )}`;
  });

  // heading
  replace(
    regexHeading,
    (all, _, p1, p2) => _ + element(`h${p1.length}`, unesc(highlight(p2)))
  );

  // paragraph
  replace(regexParagraph, (all, content) => element('p', unesc(highlight(content))));

  // stash
  replace(regexStash, (all) => stash[parseInt(all, 10)]);

  return ret.trim();
}
