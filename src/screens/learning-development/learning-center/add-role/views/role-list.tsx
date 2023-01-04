import * as React from 'react';
import { Col, Row, Card, List, Divider, Button, Modal, Tag, message, } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';
import { ProgramList } from './course-list';
import httpInstance from '../../../../../utility/http-client';
import { ProgramSearch } from './course-search';
import { editTagType } from '../../../../../models/tag-type';
import { RoleEditForm } from './role-edit-form';
const { confirm } = Modal;



export const RoleList = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [roleList, setRoleList] = React.useState([]);
    const [roleId, setRoleId] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editRole, setEditRole] = React.useState<editTagType>();
    
    const [programTagMapping, setProgramTagMapping] = React.useState({
        programIds: [],
        tagIds: [],
        tagType: Tagtype.role,
        isActive: true
    });
    const [mappingStatus, setMappingStatus] = React.useState(false);


    const showEditModal = (id:number, name:string, description:string) => {
        const role:editTagType = {
            tagId:id,
            tagName:name,
            tagDescription:description
        }
        setEditRole(role)
        console.log("test")
        setIsEditModalOpen(true);
    };
    const closeEditModel = () => {
        setIsEditModalOpen(false);
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModel = () => {
        setIsModalOpen(false);
    };



    const showConfirm = (roleId: number, roleName: string, roleType: string) => {
        confirm({
            title: `Do you Want to delete this "${roleName}" ${roleType === "ROLE" ? "Role" : "Program"}? `,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setRoleId(roleId);
            },
            onCancel() {
                setRoleId(null);
            },
        });
    };

    const handleAddProgramModel = (tagId: number, tagType: string) => {

        setProgramTagMapping({ ...programTagMapping, tagIds: [tagId], tagType: tagType });
        showModal()

    };

    React.useEffect(() => {
        //Api -> get tags and program
        (() => {
            setIsLoading(true);
            httpInstance.get(`/microsite/tag/tags-and-programs-by-tag-type/?tagType=${Tagtype.role}`)
                .then((response) => {
                    if (!!response.data.length) {
                        setRoleList(response.data);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [roleId, mappingStatus, isEditModalOpen])


    React.useEffect(() => {
        // Api-> deleteTag

        if (!roleId) return;

        (() => {
            setIsLoading(true);

            httpInstance.delete(`/microsite/tag/?tagId=${roleId}`)
                .then((response) => {
                    if (!!Object.keys(response.data).length) {
                        setRoleId(null);
                    }
                    setIsLoading(false);
                    message.success('Role successfully Deleted');

                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [roleId])



    React.useEffect(() => {
        // Api-> create program tag mapping

        if (!programTagMapping.tagIds.length || !programTagMapping.programIds.length) {
            return;
        }

        (() => {
            setIsLoading(true);

            httpInstance.post(`/microsite/program-tag/`, programTagMapping)
                .then((response) => {

                    if (response.data) {
                        setProgramTagMapping({ ...programTagMapping, tagIds: [], programIds: [] })
                        setIsModalOpen(false);
                        setMappingStatus(!mappingStatus);

                    }
                    setIsLoading(false);
                    message.success('Program successfully Added');

                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [programTagMapping])


    return (

        <>
            {isLoading ? "Loading" :
                <> {!!roleList.length ?
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={roleList}
                        renderItem={item => (

                            <List.Item>
                                <Card bordered={true}
                                    hoverable={true}
                                    style={{ textAlign: "center" }}

                                >
                                    <div><Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h5>{item.name}</h5></Col>
                                        <Col style={{ alignItems: "end" }} >
                                            <EditOutlined style={{ fontSize: 20 }} onClick={()=>{showEditModal(item.id, item.name, item.description)}}/>
                                        </Col>
                                        <Col style={{ alignItems: "end" }}>
                                            <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.id, item.name, Tagtype.role)} />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col flex={1}> 
                                            <p>{item.description}</p> 
                                        </Col> 
                                    </Row>
                                    </div>
                                    <Divider />
                                    {/* {item.programs} */}

                                    <ProgramList programTagList={item.programs} handleMappingStatus={setMappingStatus} mappingStatus={mappingStatus} />

                                    <Divider />
                                    <Button block>
                                        <Row justify="center" style={{ columnGap: 10 }} onClick={() => handleAddProgramModel(item.id, Tagtype.role)}>
                                            <Col>
                                                <p>{"Add Programs"}</p>
                                            </Col>
                                            <Col>
                                                <PlusCircleOutlined style={{ fontSize: 20 }} />
                                            </Col>
                                        </Row>
                                    </Button>

                                </Card>
                            </List.Item>
                        )
                        }
                    />

                    : null
                }
                    <Modal title="Search & Add Programs" visible={isModalOpen} footer={null} onCancel={closeModel}>
                        <ProgramSearch handleProgramTagMapping={setProgramTagMapping} programTagMapping={programTagMapping} />
                        <Divider />
                    </Modal>

                    <Modal title="Update Skill" open={isEditModalOpen} footer={null} onCancel={closeEditModel} >
                        <RoleEditForm props={{role:editRole, handleSubmit:closeEditModel}}/>
                    </Modal>
                </>
            }
        </>
    );
}






