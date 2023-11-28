import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useEffect, useState} from 'react';
import {createNewUser, fetchGroup, updateCurrentUser} from '../services/userServices'
import {toast} from 'react-toastify';
import _, {forEach} from 'lodash'

const ModalUser = (props) => {
    const {action, dataModalUser, show, onHide} = props;

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        gender: 'Male',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        gender: true,
        group: true
    }

    const [userData, setUserData] = useState(defaultUserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);

    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        getGroups();

    }, [])

    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({...dataModalUser, group: dataModalUser.groupMember ? dataModalUser.groupMember.id : ''});
        }
    }, [dataModalUser])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({...userData, group: userGroups[0].id})
            }
        }
    }, [action])

    const getGroups = async () => {
        let response = await fetchGroup();
        console.log(response)

        if (response && response.EC === 0) {
            setUserGroups(response.DT);
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT;
                setUserData({...userData, group: groups[0].id})
            }
        } else {
            toast.error(response.EM)
        }
    }

    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const CheckValidInputs = () => {

        if (action === 'UPDATE') return true;

        // create user
        setValidInputs(validInputsDefault);
        let arr = ["email", "phone", "password", "group"];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            // check empty input
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Empty input ${arr[i]}`);

                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {

        //create User
        let check = CheckValidInputs();
        if (check) {
            let response = action === 'CREATE' ?
                await createNewUser({...userData, groupId: userData['group']})
                : await updateCurrentUser({...userData, groupId: userData['group'],
                gender: userData['gender'] === null ? 'Male': userData['gender']});

            if (response && response.EC === 0) {
                props.onHide();
                setUserData({
                    ...defaultUserData, group: userGroups && userGroups.length > 0
                        ? userGroups[0].id : ''
                })
                toast.success(response.EM)
            }
            if (response && response.EC !== 0) {
                toast.error(response.EM);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[response.DT] = false;
                setValidInputs(_validInputs);
            }
        }
    }
    const handleCloseModalUser = () => {
        onHide();
        setUserData(defaultUserData);
        setValidInputs(validInputsDefault);
    }

    return (
        <>
            <Modal size="lg" show={show} className='modal-user' onHide={() => handleCloseModalUser()}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{action === 'CREATE'
                            ? 'Crete new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email Address (<span className='text-danger'>*</span>): </label>
                            <input
                                disabled={action !== 'CREATE'}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type="email" value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, "email")}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone Number(<span className='text-danger'>*</span>):</label>
                            <input
                                disabled={action !== 'CREATE'}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type="text" value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className='form-control'
                                   type="text" value={userData.username}
                                   onChange={(event) => handleOnChangeInput(event.target.value, "username")}/>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE'
                                && <>
                                    <label>Password(<span className='text-danger'>*</span>):</label>
                                    <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                           type="password" value={userData.password}
                                           onChange={(event) => handleOnChangeInput(event.target.value, "password")}/>
                                </>
                            }

                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address:</label>
                            <input className='form-control' type="text" value={userData.address}
                                   onChange={(event) => handleOnChangeInput(event.target.value, "address")}/>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select className='form-select'
                                    onChange={(event) => handleOnChangeInput(event.target.value, "gender")}
                                    value={userData.gender}
                            >
                                <option value='Male' >Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group(<span className='text-danger'>*</span>):</label>
                            <select className={validInputs.group ? 'form-select' : 'form-select is-invalid'}
                                    onChange={(event) => handleOnChangeInput(event.target.value, "group")}
                                    value={userData.group}
                            >
                                {userGroups.length > 0 &&
                                    userGroups.map((item, i) => {
                                        return (
                                            <option key={`group-${i}`} value={item.id}> {item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onHide={() => handleCloseModalUser()}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser;