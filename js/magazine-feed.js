// magazine-feed.js — 매거진 발행물 목록을 매거진 사이트에서 직접 읽어온다
//
// ★ 손으로 옮겨 적지 않는다.
//   예전에는 발행물을 index.html·about.html·news-data.js·projects-data.js 네 곳에
//   각각 복사해 넣었다. 그래서 브리프 02 를 발행하고도 홈페이지에는 없는 상태가 됐다.
//   이제 매거진 저장소가 발행할 때 index.json 을 만들고, 여기서 그것만 읽는다.
//
//   목록: https://magazine-4r3.pages.dev/index.json   (CORS 허용됨)
//   생성: 매거진 저장소 run.py 의 publish 단계 (build_index)
//
// 매거진 사이트가 응답하지 않으면 목록 대신 「매거진 사이트에서 보기」 링크만 남긴다.
// 홈페이지의 나머지는 영향을 받지 않는다.

var MAGAZINE_SITE = 'https://magazine-4r3.pages.dev';

function magBadge(item) {
    if (item['형식'] === 'brief') {
        return '데이터 브리프 ' + String(item.no).padStart(2, '0');
    }
    return '매거진 ' + item.no + '호';
}

function magCard(item) {
    var url = MAGAZINE_SITE + item.url;
    // 썸네일은 차트 카드(thumb). 표지 카드는 제목·요약을 담고 있어 목록에서 중복된다.
    var cover = (item.thumb || item.cover) ? MAGAZINE_SITE + (item.thumb || item.cover) : '';
    var a = document.createElement('a');
    a.className = 'mag-card reveal-up';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML =
        (cover
            ? '<img class="cover" src="' + cover + '" alt="' + item.title + '" loading="lazy">'
            : '<span class="cover"></span>') +
        '<div>' +
        '<span class="mag-badge">' + magBadge(item) + '</span>' +
        '<h3>' + item.title + '</h3>' +
        (item.dek ? '<p>' + item.dek + '</p>' : '') +
        '<div class="meta">' +
        '<span>' + (item.published || item.date || '') + '</span>' +
        (item['관점'] ? '<span>·</span><span>' + item['관점'] + '</span>' : '') +
        '</div>' +
        '</div>';
    return a;
}

function renderMagazine() {
    var fallback = document.getElementById('mag-fallback');

    fetch(MAGAZINE_SITE + '/index.json', { cache: 'no-cache' })
        .then(function (r) {
            if (!r.ok) { throw new Error('HTTP ' + r.status); }
            return r.json();
        })
        .then(function (data) {
            var items = (data && data['발행물']) || [];
            if (!items.length) { throw new Error('발행물 0건'); }

            var groups = [
                { key: 'sec-issue', list: 'list-issue', of: function (x) { return x['형식'] !== 'brief'; } },
                { key: 'sec-brief', list: 'list-brief', of: function (x) { return x['형식'] === 'brief'; } }
            ];
            groups.forEach(function (g) {
                var mine = items.filter(g.of);
                if (!mine.length) { return; }
                var box = document.getElementById(g.list);
                mine.forEach(function (it) { box.appendChild(magCard(it)); });
                document.getElementById(g.key).hidden = false;
            });
            setTimeout(initScrollAnimations, 50);
        })
        .catch(function (e) {
            // 조용히 비어 있으면 "매거진이 없는 것"처럼 보인다. 링크는 반드시 남긴다.
            console.warn('매거진 목록을 불러오지 못했습니다:', e);
            if (fallback) { fallback.hidden = false; }
        });
}

// 홈(index.html)에서 최신 발행물 한 편만 쓰는 경우
function renderLatestMagazine(targetId, count) {
    var box = document.getElementById(targetId);
    if (!box) { return; }
    fetch(MAGAZINE_SITE + '/index.json', { cache: 'no-cache' })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (data) {
            var items = (data && data['발행물']) || [];
            items.slice(0, count || 3).forEach(function (it) { box.appendChild(magCard(it)); });
            setTimeout(initScrollAnimations, 50);
        })
        .catch(function (e) { console.warn('최신 매거진을 불러오지 못했습니다:', e); });
}
