import React from 'react';
import OSS from 'ali-oss';
const path = require('path');

import { message, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getOSS } from '@/services/flowx-api/auth';

function generateRandomFileName(originalFileName : string) {
    const timestamp = new Date().getTime(); // 获取当前时间戳
    const randomString = Math.random().toString(36).substring(2, 8); // 生成随机字符串
    const fileExtension = path.extname(originalFileName); // 获取原始文件名的扩展名
    
    return `${timestamp}_${randomString}${fileExtension}`; // 结合时间戳、随机字符串和文件扩展名作为文件名
}


const props = {
    // accept: '*',
    action: async (file) => {
        const ossData = await getOSS();
        
        const client = new OSS({
            region: ossData.region,
            accessKeyId: ossData.accessId,
            accessKeySecret: ossData.signature,
            stsToken: ossData.stsToken,
            bucket: ossData.bucket,
        });

        console.log('file', file);
        console.log(file.name);
  
        const fileName = generateRandomFileName(file.name);
        return client.multipartUpload(fileName, file, {
            progress: (p, checkpoint) => {
                console.log(111, p, checkpoint);
            },
            mime: file.type,
        }).then((res) => {
                console.log('res', res);
                let url = client.signatureUrl(res.name, {
                    process: 'image/resize,w_200' // 设置图片处理参数。
                  });
                  console.log(url);
                return res;
            })
            .catch((err) => {
                console.log('err', err);
            });
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class CustomUpload extends React.Component {
    render() {
        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <UploadOutlined /> Click to Upload
                    </Button>
                </Upload>
            </div>
        );
    }
}

export default CustomUpload;