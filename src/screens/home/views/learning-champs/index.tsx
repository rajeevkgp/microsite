import { Card, Divider, List, Avatar, Typography, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";

const data = {
    topChamps: [
        {
            id: 4,
            profilePicture: "https://cdn.britannica.com/82/127582-050-3000C8FC/James-Watt.jpg",
            name: "Albert Rajeev",
            department: "IT",
            score: 1024
        },
        {
            id: 1,
            profilePicture: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NDM3MDU1NjIxNzY4ODM4/things-that-you-may-not-know-about-albert-einstein.jpg",
            name: "Marie Akshay",
            department: "HR",
            score: 900
        },
        {
            id: 2,
            profilePicture: "https://avatars.githubusercontent.com/u/20350203?v=4",
            name: "James Sridhar",
            department: "Accounts",
            score: 750
        },

    ],
    weeklyChamps: [{
        id: 3,
        profilePicture: "data:image/jpeg;base64,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",
        name: "Tesla Pawan",
        department: "Sales",
        score: 510
    },
    {
        id: 5,
        profilePicture: "data:image/jpeg;base64,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",
        name: "Stephan Nidhi",
        department: "IT",
        score: 432
    },
    {
        id: 2,
        profilePicture: "data:image/jpeg;base64,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",
        name: "Isaac Harsh",
        department: "IT",
        score: 320
    },
    ]
};

export const LearningChamps = () => {

    return (
        <>
            <Card className="home-card">
                <Meta title={<div><h4>Learning Champs</h4></div>} />

                {/* TOP CHAMPS */}
                <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                    <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>Top Champs</Typography.Text>
                    <div style={{ width: '100%' }} >
                        <Divider />
                    </div>
                </div>

                <List
                    dataSource={data.topChamps}
                    renderItem={item => (
                        <List.Item key={item.id} style={{ borderBottom: "0px", padding: "5px", }}>

                            <Card hoverable bodyStyle={{ padding: "10px" }} style={{ borderRadius: "10px", width: "100%", }}>
                                <div style={{ display: "flex", flexDirection: "row", columnGap: "10px" }}>
                                    <div>
                                        <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                                            src={item.profilePicture}
                                        />
                                    </div>

                                    <div style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row", }}>
                                            <div style={{ width: "100%" }}>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", }}>
                                            <div style={{ width: "100%" }}>
                                                {item.department}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row", height: '51px', width: "100%" }}>
                                            <div style={{ margin: "auto" }}>
                                                {item.score}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </List.Item>
                    )
                    }
                />




                {/* WEEKLY CHAMPS */}
                <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                    <Typography.Text disabled style={{ fontSize: "12px", width: '50%' }}>Weekly Champs</Typography.Text>
                    <div style={{ width: '100%' }} >
                        <Divider />
                    </div>
                </div>
                <List
                    dataSource={data.weeklyChamps}
                    renderItem={item => (
                        <List.Item key={item.id} style={{ borderBottom: "0px", padding: "5px", }}>

                            <Card hoverable bodyStyle={{ padding: "10px" }} style={{ borderRadius: "10px", width: "100%", }}>
                                <div style={{ display: "flex", flexDirection: "row", columnGap: "10px" }}>
                                    <div>
                                        <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                                            src={item.profilePicture}
                                        />
                                    </div>

                                    <div style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row", }}>
                                            <div style={{ width: "100%" }}>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", }}>
                                            <div style={{ width: "100%" }}>
                                                {item.department}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ width: "100%" }}>
                                        <div style={{ display: "flex", flexDirection: "row", height: '51px', width: "100%" }}>
                                            <div style={{ margin: "auto" }}>
                                                {item.score}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                        </List.Item>
                    )
                    }
                />

            </Card >
        </>
    )
}