export const tripOne = [{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "18px",
                    "items": [
                        {
                            "type": "Image",
                            "spacing": "None",
                            "url": "https://static.yunzhijia.com/microblog/filesvr/5cf63a3eb54c8d113615d385",
                            "width": "18px",
                            "horizontalAlignment": "Left",
                            "height": "18px"
                        }
                    ],
                    "horizontalAlignment": "Left",
                    "verticalContentAlignment": "Center"
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "卡片标题",
                            "size": "Medium"
                        }
                    ],
                    "verticalContentAlignment": "Center",
                    "horizontalAlignment": "Left"
                }
            ],
            "minHeight": "18px",
            "horizontalAlignment": "Left"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽名1"
                        }
                    ],
                    "width": "80px",
                    "verticalContentAlignment": "Center"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽值1",
                            "wrap": true,
                            "maxLines": 2
                        }
                    ],
                    "width": "stretch",
                    "spacing": "None",
                    "verticalContentAlignment": "Center"
                }
            ],
            "spacing": "Medium",
            "minHeight": "34px"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽名2"
                        }
                    ],
                    "width": "80px",
                    "verticalContentAlignment": "Center"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽值2",
                            "wrap": true,
                            "maxLines": 2
                        }
                    ],
                    "width": "stretch",
                    "spacing": "None",
                    "verticalContentAlignment": "Center"
                }
            ],
            "minHeight": "34px",
            "spacing": "None"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽名3"
                        }
                    ],
                    "width": "80px",
                    "verticalContentAlignment": "Center"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽值3",
                            "wrap": true,
                            "maxLines": 2
                        }
                    ],
                    "width": "stretch",
                    "spacing": "None",
                    "verticalContentAlignment": "Center"
                }
            ],
            "minHeight": "34px",
            "spacing": "None"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽名4"
                        }
                    ],
                    "width": "80px",
                    "verticalContentAlignment": "Center"
                },
                {
                    "type": "Column",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽值4",
                            "wrap": true,
                            "spacing": "None",
                            "maxLines": 2
                        }
                    ],
                    "width": "stretch",
                    "spacing": "None",
                    "verticalContentAlignment": "Center"
                }
            ],
            "minHeight": "34px",
            "spacing": "None"
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "80px",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽名5"
                        }
                    ],
                    "verticalContentAlignment": "Center",
                    "spacing": "None"
                },
                {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "词槽值5",
                            "wrap": true,
                            "maxLines": 2
                        }
                    ],
                    "spacing": "None",
                    "verticalContentAlignment": "Center"
                }
            ],
            "minHeight": "34px",
            "spacing": "None"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0",
    "actions": [
        {
            "type": "Action.Submit",
            "title": "副操作"
        },
        {
            "type": "Action.Submit",
            "title": "主操作",
            "sentiment": "Positive"
        }
    ]
}]


export const cwzb = [{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "18px",
                            "verticalContentAlignment": "Center",
                            "items": [
                                {
                                    "type": "Image",
                                    "width": "18px",
                                    "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                                    "height": "18px"
                                }
                            ],
                            "minHeight": "1px"
                        },
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "卡片标题",
                                    "horizontalAlignment": "Left",
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "horizontalAlignment": "Left",
                            "verticalContentAlignment": "Center"
                        },
                        {
                            "type": "Column",
                            "width": "auto",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "副标题",
                                    "horizontalAlignment": "Left",
                                    "spacing": "None"
                                }
                            ],
                            "verticalContentAlignment": "Center",
                            "horizontalAlignment": "Left"
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "跳转链接",
                                    "horizontalAlignment": "Right",
                                    "spacing": "None"
                                }
                            ],
                            "verticalContentAlignment": "Center",
                            "horizontalAlignment": "Right",
                            "selectAction": {
                                "type": "Action.OpenUrl",
                                "url": "XXXXXX",
                                "title": "OpenUrl"
                            }
                        }
                    ],
                    "spacing": "None"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Attention",
                                    "text": "主要指标值1",
                                    "horizontalAlignment": "Center"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "主要指标1",
                                    "horizontalAlignment": "Center",
                                    "spacing": "Small"
                                }
                            ],
                            "width": "stretch",
                            "spacing": "None",
                            "horizontalAlignment": "Center"
                        }
                    ],
                    "horizontalAlignment": "Center",
                    "spacing": "Large",
                    "minHeight": "64px"
                }
            ]
        },
        {
            "type": "TextBlock",
            "text": "卡片说明文本",
            "horizontalAlignment": "Center",
            "size": "Small",
            "spacing": "Medium"
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.0"
}]


export const multiPage = ["{\"typeInfo\":\"buildChoice\",\"$schema\":\"http://adaptivecards.io/schemas/adaptive-card.json\",\"body\":[{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"深圳云之家网络有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"深圳云之家网络有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"深圳云之家网络有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"},{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"金蝶医疗有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"金蝶医疗有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"金蝶医疗有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"},{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"金蝶我家云网络科技有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"金蝶我家云网络科技有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"金蝶我家云网络科技有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"},{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"金蝶精斗云网络科技有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"金蝶精斗云网络科技有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"金蝶精斗云网络科技有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"},{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"深圳金蝶账无忧网络科技有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"深圳金蝶账无忧网络科技有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"深圳金蝶账无忧网络科技有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"}],\"type\":\"AdaptiveCard\",\"version\":\"1.0\"}", "{\"typeInfo\":\"buildChoice\",\"$schema\":\"http://adaptivecards.io/schemas/adaptive-card.json\",\"body\":[{\"minHeight\":\"40px\",\"spacing\":\"Small\",\"columns\":[{\"width\":\"50\",\"verticalContentAlignment\":\"Center\",\"type\":\"Column\",\"items\":[{\"verticalContentAlignment\":\"Center\",\"type\":\"Container\",\"items\":[{\"maxLines\":0,\"text\":\"金蝶汽车网络科技有限公司\",\"type\":\"TextBlock\",\"wrap\":true}],\"height\":\"stretch\"}]}],\"selectAction\":{\"data\":{\"eventData\":\"金蝶汽车网络科技有限公司\",\"showSelectText\":true,\"eventType\":\"itemClick\",\"showLoading\":false},\"title\":\"金蝶汽车网络科技有限公司\",\"type\":\"Action.Submit\"},\"type\":\"ColumnSet\",\"separator\":true,\"height\":\"stretch\"}],\"type\":\"AdaptiveCard\",\"version\":\"1.0\"}"]
