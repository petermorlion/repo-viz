const { createGitgraph, TemplateName, templateExtend } = require("@gitgraph/js");

const graphContainer = document.getElementById("graph-container");

const withoutAuthor = templateExtend(TemplateName.Metro, {
    commit: {
        message: {
            displayAuthor: false
        },
    },
});
const gitgraph = createGitgraph(graphContainer, {
    template: withoutAuthor
});

const master = gitgraph.branch("master");
master
    .commit("Add empty readme and index files")
    .commit("Add repository description");

// Branch
const aFeature = master.branch("a-feature");
aFeature
    .commit("Add author")
    .commit("Create basic HTML structure");

master.merge({
    branch: aFeature,
    fastForward: true
});

// Branch 2
const anotherFeature = master.branch("another-feature");
anotherFeature
    .commit("Add lorem ipsum")
    .commit("Add footer");

master.merge({
    branch: anotherFeature,
    fastForward: false
});

// Branch 3
const feature3 = master.branch("feature3");
feature3.commit("Changed lorem ipsum to meaningful text");

master.commit("Changed lorem ipsum to intro placeholder");

master.merge({
    branch: feature3,
    fastForward: false
});

// Branch 4
// const feature4 = master.branch("feature4");
// feature4.commit("Add login fields");

// Branch 5 (rebasing)
const feature5 = master.branch("feature/user-menu");
feature5.commit("Add user menu");


const feature6 = master.branch("feature/breadcrumbs");
feature6.commit("Add breadcrumbs");
master.merge(feature6);

feature5.commit("Style user menu");

const feature8 = master.branch("feature/footer");
feature8.commit("Fix footer layout");

feature5.commit("Add logout option to user menu");

const feature7 = master.branch("feature/search-box");
feature7.commit("Add search box");

master.merge(feature8);

feature5.commit("Implement logout");
master.merge(feature5);
master.merge(feature7);
