var nodejieba = require('nodejieba');

exports.onCreateNode = ({ node, actions }, { max } = {}) => {
    const { createNodeField } = actions;

    if (
        node.internal.type === `MarkdownRemark` ||
        node.internal.type === `Mdx`
    ) {
        const bodyText =
            node.internal.type === `MarkdownRemark`
                ? node.rawMarkdownBody
                : node.rawBody;

        const keywords = nodejieba
            .extract(bodyText, max)
            .map(item => item.word);

        createNodeField({
            node,
            name: `keywords`,
            value: keywords,
        });
    }
};
