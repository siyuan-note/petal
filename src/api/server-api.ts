/* eslint-disable */
import { config } from '../config';
import { genUUID } from '../util';

export async function request(url, data) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
    }).then(function (response) {
        resData = response.json();
    });
    return resData;
}

export async function parseBody(response) {
    let r = await response;
    return r.code === 0 ? r.data : null;
}

export async function transactions(protyle, transactions = []) {
    const url = '/api/transactions';
    const ws_url = new URL(protyle.ws.ws.url);
    const data = {
        app: ws_url.searchParams.get('app'),
        session: ws_url.searchParams.get('id'),
        transactions: transactions,
    };
    return parseBody(request(url, data));
}

export async function sql(sql) {
    let sqldata = {
        stmt: sql,
    };
    let url = '/api/query/sql';
    return parseBody(request(url, sqldata));
}

export async function lsNotebooks(sql) {
    let sqldata = { stmt: sql };
    let url = '/api/notebook/lsNotebooks';
    return parseBody(request(url, sqldata));
}

export async function getAnchor(anchorText, name) {
    anchorText = anchorText.replace('((', '').replace('))', '');
    let sqlScript = `select * from blocks where id = '${anchorText}'`;
    let sqlRes = await sql(sqlScript);
    let anchor = '';
    if (sqlRes) {
        try {
            if (sqlRes[0][name]) {
                anchor = sqlRes[0][name];
            } else if (sqlRes[0]['content']) {
                anchor = sqlRes[0]['content'];
            } else {
                anchor = anchorText;
            }
        } catch (e) {
            anchor = '解析错误';
        }
    }
    return anchor;
}

export async function openNotebook(notebookId) {
    let data = {
        notebook: notebookId,
    };
    let url = '/api/notebook/openNotebook';
    return parseBody(request(url, data));
    //返回空数据
}

export async function closeNotebook(notebookId) {
    let data = {
        notebook: notebookId,
    };
    let url = '/api/notebook/closeNotebook';
    return parseBody(request(url, data));
    //返回空数据
}

export async function renameNotebook(notebookId, notebookNewName) {
    let data = {
        notebook: notebookId,
        name: notebookNewName,
    };
    let url = '/api/notebook/renameNotebook';
    return parseBody(request(url, data));
    //返回空数据
}

export async function createNotebook(notebookName) {
    let data = {
        name: notebookName,
    };
    let url = '/api/notebook/createNotebook';
    return parseBody(request(url, data));
    //返回空数据
}

export async function removeNotebook(notebookId) {
    let data = { notebook: notebookId };
    let url = '/api/notebook/removeNotebook';
    return parseBody(request(url, data));
    //返回空数据
}

export async function getNotebookConf(notebookId) {
    let data = { notebook: notebookId };
    let url = '/api/notebook/getNotebookConf';
    return parseBody(request(url, data));
    //返回笔记本配置
}

export async function setNotebookConf(notebookId) {
    let data = { notebook: notebookId };
    let url = '/api/notebook/setNotebookConf';
    return parseBody(request(url, data));
    //返回笔记本配置
}

export async function renameDoc(notebookId, path, title) {
    let data = {
        notebook: notebookId,
        path: path,
        title: title,
    };
    let url = '/api/filetree/renameDoc';
    return parseBody(request(url, data));
    //返回空数据
}

export async function removeDoc(notebookId, path) {
    let data = {
        notebook: notebookId,
        path: path,
    };
    let url = '/api/filetree/removeDoc';
    return parseBody(request(url, data));
    //返回空数据
}

export async function moveDoc(srcNotebookId, srcPath, targetNotebookId, targetPath) {
    let data = {
        fromNotebook: srcNotebookId,
        fromPath: srcPath,
        toNotebook: targetNotebookId,
        toPath: targetPath,
    };
    let url = '/api/filetree/moveDoc';
    return parseBody(request(url, data));
    //返回空数据
}

export async function getHPathByPath(notebookId, path) {
    let data = {
        Notebook: notebookId,
        Path: path,
    };
    let url = '/api/filetree/getHPathByPath';
    return parseBody(request(url, data));
    //返回路径
}

export async function getHPathByID(ID) {
    let data = {
        id: ID,
    };
    let url = '/api/filetree/getHPathByID';
    return parseBody(request(url, data));
}

//暂缺上传文件

export async function getBlockAttrs(blockId) {
    let data = {
        id: blockId,
    };
    let url = '/api/attr/getBlockAttrs';
    return parseBody(request(url, data));
}

export async function getBlockByID(blockId) {
    let sqlScript = `select * from blocks where id ='${blockId}'`;
    let data = await sql(sqlScript);
    return data[0];
}

export async function getBlockKramdown(blockId) {
    const data = {
        id: blockId,
    };
    const url = '/api/block/getBlockKramdown';
    return parseBody(request(url, data));
}

export async function getBlockBreadcrumb(ID) {
    const data = {
        id: ID,
    };
    const url = '/api/block/getBlockBreadcrumb';
    return parseBody(request(url, data));
}

export async function setBlockAttrs(blockId, attrs) {
    let url = '/api/attr/setBlockAttrs';
    return parseBody(
        request(url, {
            id: blockId,
            attrs: attrs,
        })
    );
}

export async function exportMdContent(docId) {
    let data = {
        id: docId,
    };
    let url = '/api/export/exportMdContent';
    return parseBody(request(url, data));
    //文档hepath与Markdown 内容
}

export async function getDocOutline(docId) {
    let data = {
        id: docId,
    };
    let url = '/api/outline/getDocOutline';
    return parseBody(request(url, data));
}

export async function listDocsByPath(path) {
    let data = {
        path: path,
    };
    let url = '/api/filetree/listDocsByPath';
    return parseBody(request(url, data));
    //文档hepath与Markdown 内容
}

function html转义(text) {
    var tempEl = document.createElement('div');
    tempEl.innerHTML = text;
    var output = tempEl.innerText || tempEl.textContent;
    tempEl = null;
    return output;
}

export async function getBacklink(id) {
    let data = {
        id: id,
        beforeLen: 10,
        k: '',
        mk: '',
    };
    let url = '/api/ref/getBacklink';
    return parseBody(request(url, data));
}

export async function searchEmbedBlock(excludeIds, sql) {
    let data = {
        stmt: sql,
        excludeIDs: excludeIds,
    };
    let url = '/api/search/searchEmbedBlock';
    return parseBody(request(url, data));
}
export async function getDoc(id) {
    let data = {
        id: id,
        k: '',
        mode: 2,
        size: 36,
    };
    let url = '/api/filetree/getDoc';
    return parseBody(request(url, data));
}
export async function getFocusedDoc(id) {
    let data = {
        id: id,
        k: '',
        mode: 0,
        size: 36,
    };
    let url = '/api/filetree/getDoc';
    return parseBody(request(url, data));
}
export async function getTag() {
    let data = {};
    let url = '/api/tag/getTag';
    return parseBody(request(url, data));
}
export async function getLocalGraph(k, id, conf, reqId) {
    let data = {
        id: id,
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = '/api/graph/getLocalGraph';
    return parseBody(request(url, data));
}
export async function getGraph(k, conf, reqId) {
    let data = {
        k: k,
        conf: conf,
        reqId: reqId,
    };
    let url = '/api/graph/getGraph';
    return parseBody(request(url, data));
}

export async function searchDocs(k) {
    let data = {
        k: k,
    };
    let url = '/api/filetree/searchDocs';
    return parseBody(request(url, data));
}
export async function searchBlock(query) {
    let data = {
        query: query,
    };
    let url = '/api/search/searchBlock';
    return parseBody(request(url, data));
}
export async function searchTemplate(k) {
    let data = {
        k: k,
    };
    let url = '/api/search/searchTemplate';
    return parseBody(request(url, data));
}

export async function createDocWithMd(notebook, path, markdown) {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = '/api/filetree/createDocWithMd';
    return parseBody(request(url, data));
}

export async function docSaveAsTemplate(id, overwrite = false) {
    let url = '/api/template/docSaveAsTemplate';
    let data = {
        id: id,
        overwrite: overwrite,
    };
    return parseBody(request(url, data));
}

export async function render(data) {
    let url = '/api/template/render';
    return parseBody(request(url, data));
}

export async function insertBlock(previousID, dataType, data) {
    let url = '/api/block/insertBlock';
    return parseBody(
        request(
            (url = url),
            (data = {
                previousID: previousID,
                dataType: dataType,
                data: data,
            })
        )
    );
}

export async function prependBlock(parentID, dataType, data) {
    let url = '/api/block/prependBlock';
    return parseBody(
        request(
            (url = url),
            (data = {
                parentID: parentID,
                dataType: dataType,
                data: data,
            })
        )
    );
}
export async function appendBlock(parentID, dataType, data) {
    let url = '/api/block/appendBlock';
    return parseBody(
        request(
            (url = url),
            (data = {
                parentID: parentID,
                dataType: dataType,
                data: data,
            })
        )
    );
}

export async function updateBlock(id, dataType, data) {
    let url = '/api/block/updateBlock';
    return parseBody(
        request(
            (url = url),
            (data = {
                id: id,
                dataType: dataType,
                data: data,
            })
        )
    );
}

export async function deleteBlock(id) {
    let url = '/api/block/deleteBlock';
    return parseBody(request(url, { id }));
}

export async function moveBlock(id: string, previousID: string | null = null, parentID: string | null = null) {
    let url = '/api/block/moveBlock';
    return parseBody(
        request(url, { id: id, previousID: previousID, parentID: parentID })
    );
}

export async function getSysFonts() {
    let url = '/api/system/getSysFonts';
    return parseBody(request(url, null));
}

export async function getFile(path: string, type: 'json' | 'text' = 'text') {
    const response = await fetch('/api/file/getFile', {
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.status === 200) {
        if (type === 'text') {
            return await response.text();
        }
        if (type === 'json') {
            return (await response.json()).data;
        }
    }
    return null;
}

export async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
    let blob = new Blob([filedata]);
    let file = new File([blob], path.split('/').pop());
    let formdata = new FormData();
    formdata.append('path', path);
    formdata.append('file', file);
    formdata.append('isDir', String(isDir));
    formdata.append('modTime', String(modTime));
    const response = await fetch('/api/file/putFile', {
        body: formdata,
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
    });
    if (response.status === 200) return await response.json();
    else return null;
}

export async function readDir(path: string) {
    const response = await fetch('/api/file/readDir', {
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.status === 200) {
        return (await response.json()).data;
    };
    return null;
}

export async function removeFile(path) {
    const response = await fetch('/api/file/removeFile', {
        method: 'POST',
        headers: {
            Authorization: `Token ${config().token}`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.status === 200) return;
    else return null;
}

const language = window.theme?.languageMode;

export async function pushMsg(message = null, text = null, timeout = 7000) {
    const url = '/api/notification/pushMsg';
    const data = {
        msg: message ? message[language] || message.other : text,
        timeout: timeout,
    };
    return parseBody(request(url, data));
}

export async function pushErrMsg(message = null, text = null, timeout = 7000) {
    const url = '/api/notification/pushErrMsg';
    const data = {
        msg: message ? message[language] || message.other : text,
        timeout: timeout,
    };
    return parseBody(request(url, data));
}

export async function setStorageVal(key: string, val: any) {
    const url = '/api/storage/setLocalStorageVal';
    const data = {
        app: genUUID(),
        key,
        val,
    };
    return parseBody(request(url, data));
}

export async function getLocalStorage() {
    const url = '/api/storage/getLocalStorage';
    return parseBody(request(url, null));
}

export async function renderSprig(sprig: string) {
    let url = '/api/template/renderSprig';
    return parseBody(request(url, {template: sprig}));
}

export async function getBazzarWidget() {
    const url = '/api/bazaar/getBazaarWidget';
    return parseBody(request(url, null));
}
