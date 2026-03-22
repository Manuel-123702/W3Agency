import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
    name: "review",
    title: "Reviews",
    type: "document",
    icon: StarIcon,

    fields: [
        defineField({
            name: "product",
            title: "Product",
            type: "reference",
            to: { type: "product" },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "name",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.required().min(1).max(5),
        }),

        defineField({
            name: "comment",
            title: "Review Comment",
            type: "text",
        }),

        defineField({
            name: "date",
            title: "Review Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],

    preview: {
        select: {
            title: "name",
            subtitle: "comment",
            rating: "rating",
        },
        prepare(selection) {
            const { title, subtitle, rating } = selection;

            return {
                title: `${title} (${rating}★)`,
                subtitle: subtitle,
            };
        },
    },
});