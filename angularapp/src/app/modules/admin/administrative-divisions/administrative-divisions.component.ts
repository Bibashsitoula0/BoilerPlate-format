import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
    CommonService,
    ResponseOfListOfSelectList,
    SelectList,
} from 'app/Service/api.client.generated';
interface TreeNode {
    name: string;
    children?: TreeNode[];
}
const TREE_DATA: TreeNode[] = [
    {
        name: 'Province 1',
        children: [
            {
                name: 'TAPLEJUNG',
                children: [
                    {
                        name: 'Phungling Municipality',
                    },
                    {
                        name: 'Sidingba Rural Municipality',
                    },
                ],
            },
        ],
    },
    {
        name: 'Province 2',
        children: [
            {
                name: 'District X',
                children: [
                    {
                        name: 'Palika Y',
                    },
                    {
                        name: 'Palika Z',
                    },
                ],
            },
        ],
    },
];

@Component({
    selector: 'app-administrative-divisions',
    templateUrl: './administrative-divisions.component.html',
    styleUrls: ['./administrative-divisions.component.scss'],
})
export class AdministrativeDivisionsComponent implements OnInit {
    treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();

    constructor(private commonService: CommonService) {
        this.dataSource.data = TREE_DATA;
    }
    ngOnInit(): void {}

    hasChild = (_: number, node: TreeNode) =>
        !!node.children && node.children.length > 0;
}
