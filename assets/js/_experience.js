document.addEventListener("DOMContentLoaded", () => {
    let mermaid = import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');
    // let mermaid = import('./deps/mermaid.esm.min.mjs');
    mermaid.initialize({ startOnLoad: true });

    console.log('Mermaid initialized');

    var DateTime = luxon.DateTime;
    var Duration = luxon.Duration;

    document.querySelectorAll(".experience__item").forEach((experienceWrapper) => {
        const experienceDateWrapper = experienceWrapper.querySelectorAll(".experience__date");
        console.log(`experienceWrapper:`, experienceWrapper);
        const positions = Array.from(experienceDateWrapper).map((position) => {

            const start = position.querySelector(".experience__date__start")?.textContent?.trim();
            const end = position.querySelector(".experience__date__end")?.textContent?.trim();

            const startDate = DateTime.fromFormat(start, "MMM yyyy", { locale: "en" });
            const currentDate = DateTime.now().toFormat("MMM yyyy")
            const endDate = DateTime.fromFormat((!end || end === 'Current') ? currentDate : end, "MMM yyyy", { locale: "en" }).plus({ months: 1 });

            let durationDiff = endDate?.diff(startDate, ['years', 'months']);
            console.log('durationDiff', durationDiff);
            durationDiff = durationDiff.toFormat(`${durationDiff.years >= 1 ? "y'y' " : ""}${durationDiff.months >= 1 ? "M'm'" : ""}`);
            if (experienceDateWrapper.length > 1) {
                position.querySelector(".experience__date__duration").textContent = `${durationDiff} ~ `;
            }

            console.log(`start: ${start}`);
            console.log(`end: ${end}`);
            console.log(`durationDiff: ${durationDiff}`);

            return {
                start: startDate,
                end: endDate,
                duration: durationDiff,
            }
        });
        console.log(`positions:`, positions);
        const positionStart = DateTime.min(...positions.map((pos) => pos.start));
        const positionEnd = DateTime.max(...positions.map((pos) => pos.end));
        const positionDuration = positionEnd?.diff(positionStart, ['years', 'months']);
        console.log(`positionStart: ${positionStart}`);
        console.log(`positionEnd: ${positionEnd}`);
        const positionDurationSlot = experienceWrapper.querySelector(".experience__duration");
        if (positionDurationSlot) {
            positionDurationSlot.textContent = positionDuration?.toFormat(`
                ${positionDuration.years >= 1 ? "y'y' " : ""}
                ${positionDuration.months >= 1 ? "M'm'" : ""}
            `) || "";
        }

        // for (const wrapper of document.querySelectorAll(".experience__date")) {
        //     const start = wrapper.querySelector(".experience__date__start")?.textContent?.trim();
        //     const end = wrapper.querySelector(".experience__date__end")?.textContent?.trim();

        //     const startDate = DateTime.fromFormat(start, "MMM yyyy", { locale: "en" });
        //     const currentDate = DateTime.now().toFormat("MMM yyyy")
        //     const endDate = DateTime.fromFormat((!end || end === 'Current') ? currentDate : end, "MMM yyyy", { locale: "en" }).plus({ months: 1 });

        //     let durationDiff = endDate.diff(startDate, ['years', 'months']);
        //     console.log(durationDiff);
        //     durationDiff = durationDiff.toFormat(`${durationDiff.years >= 1 ? "y'y' " : ""}${durationDiff.months >= 1 ? "M'm'" : ""}`);
        //     wrapper.querySelector(".experience__date__duration").textContent = durationDiff;
        // }


    });
});