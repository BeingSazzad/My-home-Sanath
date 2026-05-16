
export const mainTheme = {
    token: { 
        controlHeight: 42, 
        colorPrimary: "var(--color-primary)",
        fontFamily: "var(--font-inter), 'Inter', sans-serif"
    },
    components: {
        Input: {
            borderRadius: 12,
            colorBorder: "#d9d9d9",
            colorPrimaryBg: "#ffffff",
            colorText: "#1f2937",
            inputFontSize: 16,
            colorBgBlur: "#ffffff",
            colorTextPlaceholder: "#9ca3af",
            colorBgContainer: "#ffffff",
        },

        Modal: {
            colorIcon: "#000",
            colorBgMask: "rgba(64,64,64,0.5)",
            headerBg: "transparent",
            titleColor: "#909090 ",
            titleFontSize: 22,
        },
        Menu: {
            itemSelectedBg: "rgba(1, 46, 124, 0.2)",
            itemSelectedColor: "var(--color-primary)",
            itemHoverColor: "var(--color-primary)",
            borderRadius: 0,
            // submenu
            subMenuItemSelectedColor: "var(--color-primary)",
        },
        Select: {
            optionSelectedBg: "var(--color-primary)",
            optionSelectedColor: "#fff",
            colorTextPlaceholder: "var(--color-primary)",
            optionActiveBg: "rgba(1, 46, 124, 0.2)",
            optionActiveColor: "var(--color-primary)",

            optionPaddingBlock: 6, // 👈 base spacing (single value only)
        },
        Collapse: {
            headerBg: "#043623",
            contentBg: "rgba(255,255,255,0.4)",
            colorText: "#ffffff",
            colorTextHeading: "#fff",
            fontSize: 18,
            colorPrimaryBorder: '#043623',
            borderlessContentBg: 'transparent',

        },
        Pagination: {
            itemActiveBg: "rgba(2, 115, 72, .8)",
            itemBg: "rgba(0,42,96,0.3215686274509804)",
            colorPrimary: "rgb(255,255,255)",
            colorText: "rgb(255,255,255)",
            colorTextDisabled: "rgb(255,255,255, .5)",
            borderRadius: 25,
            itemSize: 40,
        },
        Table: {
            colorBgContainer: "#121215",
            borderColor: "#404040",
            headerBg: "#043623 ",
            colorText: "#fff",
            headerColor: "#ffffff",
            headerSplitColor: "transparent",
            colorSplit: "transparent",
            cellPaddingBlock: 15,
        },
    },
};
