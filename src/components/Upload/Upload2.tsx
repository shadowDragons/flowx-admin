import React from 'react';
import OSS from 'ali-oss';

import { message, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getOSS } from '@/services/flowx-api/auth';

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
        // const cc = new Blob(file);
        return client.multipartUpload(file.name, file, {
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

class CustomUpload2 extends React.Component {
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

export default CustomUpload2;