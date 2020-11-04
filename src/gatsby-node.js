var nodejieba = require('nodejieba');

exports.onCreateNode = (
    { node, actions },
    { max, process, afterProcess } = {}
) => {
    const { createNodeField } = actions;

    if (
        node.internal.type === `MarkdownRemark` ||
        node.internal.type === `Mdx`
    ) {
        const bodyText =
            node.internal.type === `MarkdownRemark`
                ? node.rawMarkdownBody
                : node.rawBody;

        let important = [];
        if (process) {
            important = process(bodyText);
        }

        const keywords = nodejieba
            .extract(bodyText, max)
            .map(item => item.word);

        let lastKeywords = important.concat(keywords);
        if (afterProcess) {
            lastKeywords = afterProcess(lastKeywords);
        }

        createNodeField({
            node,
            name: `keywords`,
            value: lastKeywords,
        });
    }
};
