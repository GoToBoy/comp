import React, { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import type { Ace } from "ace-builds/ace";

import "ace-builds/src-noconflict/mode-mysql";
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/mode-json';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/ext-language_tools";
import "./mode-freemarker"; // mode freemarker

import { detectStatementType } from "./utils";
import { keywords, sqlKeywords } from "./const";

import snippetList from "./snippets.json"; // freemarker snippet

interface IProps {
	defaultValue: string;
	onChange: (value: string) => void;
}

interface Snippet {
	prefix: string;
	body: string;
	description: string;
	scope: string;
}

type SnippetObject = Record<string, Snippet>;

const MyEditor = (props: IProps) => {
	const editorRef = useRef<AceEditor | null>(null);

	useEffect(() => {
		// 获取 Ace 编辑器实例
		const editor = editorRef?.current?.editor;

		// 创建自定义自动补全器
		const customCompleter = {
			getCompletions: (
				_editor: Ace.Editor,
				_session: Ace.EditSession,
				_pos: Ace.Position,
				prefix: string,
				callback: (err: any, wordList: Ace.Completion[]) => void
			) => {
				const wordList = keywords.map((keyword) => ({
					value: keyword,
					meta: "keyword",
				}));

				const sqlKeywordsList = sqlKeywords.map((keyword) => ({
					value: keyword,
					meta: "sql",
				}));

				const snippetRets: Ace.SnippetCompletion[] = [];
				Object.keys(snippetList).forEach((key: keyof SnippetObject) => {
					const i = (snippetList as SnippetObject)[key];
					snippetRets.push({
						caption: i.prefix,
						snippet: i.body,
						meta: i.description,
						docHTML: i.body,
						docText: i.description,
					});
				});

				callback(null, [...wordList, ...sqlKeywordsList, ...snippetRets]);
			},
		};

		// 启用自动补全
		editor?.setOptions({
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: true,
		});

		if (editor) {
			editor.completers = [customCompleter];
		}
	}, [editorRef]);

	return (
		<AceEditor
			mode={detectStatementType(props.defaultValue)} // 使用自定义的 FreeMarker mode（需要自行定义）
			theme="monokai"
			defaultValue={props.defaultValue}
			width="100%"
			enableSnippets={true}
			setOptions={{
				enableBasicAutocompletion: true, //启用基本自动完成功能
				enableLiveAutocompletion: true, //启用实时自动完成功能 （比如：智能代码提示）
				enableSnippets: true, //启用代码段
				showLineNumbers: true,
				tabSize: 2,
			}}
			// completers={customCompleters} // 将自定义代码提示传递给 completers 属性
			// markers={customHighlightRules}
			onChange={props.onChange}
			ref={editorRef}
		/>
	);
};

export default MyEditor;
