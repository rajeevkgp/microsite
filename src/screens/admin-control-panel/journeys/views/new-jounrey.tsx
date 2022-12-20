import { Button, Form, Input, List, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { handleFormSubmit, onSelectHandler, removeProgramHadler } from '../../../../service/journey-service';
import { ProgramMapType } from '../../../../models/journey-details';
import { SearchInput } from '../../../../components/search-input/search-input';
import { Upload } from '../../../../components/upload.component';
import ReactDragListView from "react-drag-listview";
import { arrayMove } from '../../../../utility/array-utils';

type editJourneyDetails = {
  id?: string,
  title?: string,
  description?: string,
  sequence?: boolean,
}

export const NewJourney: React.FC = () => {

  const navigate = useNavigate()
  const [programs, setPrograms] = React.useState<ProgramMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')
  const [journey, setJourney] = React.useState<editJourneyDetails>({ sequence: true })

  const { Option } = Select;

  const onFinish = () => {
    if(journey.title != null && journey.title.trim() != '') {
    let resp = handleFormSubmit(journey, programs, thumbnail, 'GENERAL')
    if(resp)
      resp.then(resp => {
      if (resp.data) {
        message.success('Journey added successfully');
        navigate("/admin/admin-lnds/journeys");
      }
    })
  }
  else{
    setJourney({
      id: journey.id,
      title: '',
      description : journey.description,
      sequence : journey.sequence
    })
  }
  };

  const addProgram = () => {
    setPrograms([...programs, { program: null, programName: undefined }])
  }

  const removeProgram = (index: number) => {
    setPrograms(removeProgramHadler(index, programs))
  }

  const handleOnSelect = (e: any, index: number) => {
    setPrograms(onSelectHandler(index, e, programs))
  }

  const onDragEnd = (fromIndex: number, toIndex: number) => {
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    let sortedPrograms = arrayMove(programs, fromIndex, toIndex);
    return setPrograms(sortedPrograms);
  };

  return (<>
    <React.Fragment>
      <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Back</Button></div>

      <h4>Create New Journey</h4>

      <div className='scroll-container' style={{width: '60%'}}>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item>
            Thumbnail
            <Upload
              //fileType='image'
              onDone={(info) => { setThumbnail(info.documentId); setThumbnailUrl(info.file) }}
              onRemove={() => { setThumbnail(''); setThumbnailUrl('') }}
              file = {thumbnailUrl}
              accept="image/png, image/jpeg, image/jpg"  />
          </Form.Item>

          <Form.Item>
            Title<span style={{color: 'red'}}>* { journey.title != undefined && journey.title.trim() == '' && <>Title Cannot be Blank</>}</span>
            <Input value={journey.title} onChange={(e) => {
              setJourney({
                id: journey.id,
                title: e.target.value,
                description: journey.description,
                sequence: journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item >
            Description
            <Input.TextArea value={journey.description} onChange={(e) => {
              setJourney({
                id: journey.id,
                title: journey.title,
                description: e.target.value,
                sequence: journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={journey.sequence} defaultChecked onChange={(e) => {
              setJourney({
                id: journey.id,
                title: journey.title,
                description: journey.description,
                sequence: !journey.sequence
              })
            }} />
          </Form.Item>

          <Form.Item >
            Programs
            <div style={{ width: "325px" }}>
              <ReactDragListView
                nodeSelector=".ant-list-item.draggable-item"
                lineClassName="dragLine"
                onDragEnd={(fromIndex, toIndex) =>
                  onDragEnd(fromIndex, toIndex)
                }
              >
                {programs
                  .map((program: ProgramMapType, index) => (
                    <List.Item key={program.programName ? index + program.programName : index} className="draggable-item">
                      <div>
                        <HolderOutlined style={{ cursor: 'grab' }} />
                        <SearchInput
                          defaultValue={program.programName}
                          onSelect={(e: any) => { handleOnSelect(e, index) }}
                          placeholder='Select Program'
                          style={{ width: 250 }}
                        />
                        <Button danger className='remove-btn' type='primary' onClick={() => { removeProgram(index) }} style={{ marginLeft: "5px" }}>-</Button>
                      </div>
                    </List.Item>
                  ))}
              </ReactDragListView>
              <Button disabled={! (programs.filter(p => p.programName == undefined).length == 0)} type='dashed'
                onClick={() => { addProgram() }
                }>
                <PlusOutlined /> Add Program
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>

        </Form>
      </div>
    </React.Fragment>
  </>
  );
};