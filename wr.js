"use strict";

const RACE_IDX = 8;
const QUAL_IDX = 9;
const TT_IDX = 10;
const PRAC_IDX = 11;

const TIME_IDXS = [RACE_IDX, QUAL_IDX, TT_IDX, PRAC_IDX];

let saved = [null, null, null, null];

function duration_as_ms(duration_str) {
    const [rest, ms] = duration_str.split(".");
    const [m, s] = rest.split(":");
    return parseInt(ms) + parseInt(s) * 1000 + parseInt(m) * 60 * 1000;
}

function duration_offset(base, other) {
    let base_ms = duration_as_ms(base);
    let other_ms = duration_as_ms(other);
    return {
        diff: ((other_ms - base_ms) / 1000).toFixed(1),
        ratio: (((other_ms / base_ms) - 1) * 100).toFixed(1)
    }
}

function fmt_offset(offset) {
    return `${offset.diff}s, ${offset.ratio}%`;
}

function fetch_best(idx) {
    let wrs = document.querySelector(".worldrecords_table").getElementsByTagName("tr");
    let best_row = wrs[2].getElementsByTagName("td");
    return best_row[idx].innerText;
}

function fetch_personal(idx) {
    let personal_row = document.querySelector(".stats_findme_tr").getElementsByTagName("td");
    return personal_row[idx].innerText;
}

document.arrive(".stats_findme_tr", function () {
    let personal_times = TIME_IDXS.map((idx) => fetch_personal(idx));
    let best_times = TIME_IDXS.map((idx) => fetch_best(idx));
    let header = document.querySelector(".worldrecords_table").getElementsByTagName("tr")[0].getElementsByTagName("th");

    this.onmouseover = () => {
        for (let i = 0; i < TIME_IDXS.length; i++) {
            saved[i] = header[TIME_IDXS[i] - 1].innerHTML;
            if (personal_times[i] && best_times[i]) {
                header[TIME_IDXS[i] - 1].innerText = fmt_offset(duration_offset(best_times[i], personal_times[i]));
            }
        }
    }

    this.onmouseout = () => {
        for (let i = 0; i < TIME_IDXS.length; i++) {
            header[TIME_IDXS[i] - 1].innerHTML = saved[i];
        }
    }
});




