import React, { useRef, useEffect } from "react";
import {multilanguage} from "redux-multilanguage";
import {connect, useSelector} from "react-redux";
import store from "../store";
import {loginSuccess, openAuthForm, closeAuthForm} from '../reducers/userReducer'
import CircularProgress from '@material-ui/core/CircularProgress';
import userservice from "../services/user.service";
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function UpdateAddressComponent(props)
{
    return (
        <div className="modal-form">
            <div className="heading">THÔNG TIN NHẬN HÀNG</div>
            <form id="auth-block__login-form" className="auth-block__form" method="post">
                <div className="mz-form-group">
                    <div className="mz-form-group__control-col">
                        <TextField
                            id="standard-full-width"
                            label="Họ tên đầy đủ"
                            style={{ margin: 8 }}
                            placeholder="Ví dụ: Nguyễn Văn A"
                            helperText=""
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className="mz-form-group">
                    <div className="mz-form-group__control-col">
                        <TextField
                            id="standard-full-width"
                            label="Số điện thoại"
                            style={{ margin: 8 }}
                            placeholder="eg: 09123456789"
                            helperText=""
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className="mz-form-group">
                    <div className="mz-form-group__control-col">
                        <div className="mz-form-control mz-form-control-md">
                            <FormControl style={{width:"100%", margin: "8px"}}>
                                <InputLabel id="label" shrink>Địa điểm</InputLabel>
                                <Select labelId="label" id="select" value="0">
                                    <MenuItem value="0" disabled>
                                        Tỉnh/Thành phố
                                    </MenuItem>
                                    <MenuItem value="10">Ten</MenuItem>
                                    <MenuItem value="20">Twenty</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                            <div className="mz-form-control mz-form-control-md">
                                <FormControl style={{width:"100%", margin: "8px"}}>
                                    <Select id="district" value="0" disabled>
                                        <MenuItem value="0" disabled>
                                            Quận/Huyện
                                        </MenuItem>
                                        <MenuItem value="10">Ten</MenuItem>
                                        <MenuItem value="20">Twenty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="mz-form-control mz-form-control-md">
                                <FormControl style={{width:"100%", margin: "8px"}}>
                                    <Select id="district" value="0" disabled>
                                        <MenuItem value="0" disabled>
                                            Xã/Phường
                                        </MenuItem>
                                        <MenuItem value="10">Ten</MenuItem>
                                        <MenuItem value="20">Twenty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                    </div>
                </div>
                <div className="mz-form-group">
                    <div className="mz-form-group__control-col">
                        <TextField
                            id="standard-full-width"
                            label="Địa chỉ chính xác"
                            style={{ margin: 8 }}
                            placeholder="Số nhà, tên đường"
                            helperText="(nhập chính xác và chi tiết địa chỉ để đảm bảo nhận hàng đúng thời gian)"
                            fullWidth
                            multiline
                            margin="0px"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>

                <div className="mz-form-group">
                    <div className="mz-form-group__control-col" style={{textAlign: "center"}}>
                        <Button variant="contained" color="primary">
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default connect()(multilanguage(UpdateAddressComponent));