import { Repository } from '../class/repository';
import { Commit } from '../class/commit';
import { Cve } from '../class/cve';
import { Branch } from '../class/branch';
import { cve1, cve2, cve3 } from './mock-cve';
import { tree, tree2 } from './mock-git-tree';

const commit1: Commit = new Commit("aasdvf23cv", "first commit", "20170505", "qwefgh90", "leadersama", "url");

const commit2: Commit = new Commit("7ukm7j6km", "second commit", "20170505", "qwefgh90", "leadersama", "url");

const commit3: Commit = new Commit("tl24k5t24", "third commit", "20170505", "qwefgh90", "leadersama", "url");

export const COMMITS1 = [commit1, commit2, commit3];

export const BRANCHES1: Branch[] = [new Branch("develop", undefined), new Branch("feature-2", undefined)]

export const REPOSITORIES: Repository[] = [
    new Repository(1, 'qwefgh90', 'opencv', 'http://www.naver.com', "on", undefined),
    new Repository(2, 'qwefgh90', 'repos', 'http://www.naver.com', "off", [new Branch("master", []), new Branch("feature-1", [])]),
    new Repository(3, 'qwefgh90', 'algorithm', 'http://www.naver.com', "on", [new Branch("master", [commit2, commit3]), new Branch("develop", [])])
];

//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3161.yaml
/*
cve: 2017-3161
title: "Apache Hadoop NameNode XSS vulnerability"
description: >
    The HDFS web UI is vulnerable to a cross-site scripting (XSS) attack through an unescaped query parameter.
cvss_v2: 6.0
references:
    - https://bugzilla.redhat.com/show_bug.cgi?id=1448373
    - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3161
    - http://seclists.org/oss-sec/2017/q2/127
affected:
    - groupId: "org.apache.hadoop"
      artifactId: "hadoop-hdfs"
      version:
        - "<=2.6.5"
      fixedin:
        - ">=2.7.0"
*/

//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3162.yaml
/*
cve: 2017-3162
title: "Apache Hadoop DataNode web UI vulnerability"
description: >
    HDFS clients interact with a servlet on the DataNode to browse the HDFS namespace. The NameNode is provided as a query parameter that is not validated in Apache Hadoop before 2.7.0.
cvss_v2: 6.0
references:
    - https://bugzilla.redhat.com/show_bug.cgi?id=1448373
    - http://openwall.com/lists/oss-security/2017/04/26/1
    - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3162
    - http://seclists.org/oss-sec/2017/q2/126
affected:
    - groupId: "org.apache.hadoop"
      artifactId: "hadoop-hdfs"
      version:
        - "<=2.6.5"
      fixedin:
        - ">=2.7.0"
*/
//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3159.yaml

/*
cve: 2017-3159
title: "Apache Camel's Snakeyaml unmarshalling operation is vulnerable to Remote Code Execution attacks"
description: >
    Apache Camel's camel-snakeyaml component is vulnerable to Java object de-serialization vulnerability. De-serializing untrusted data can lead to security flaws.
cvss_v2: 7.5
references:
    - http://camel.apache.org/security-advisories.data/CVE-2017-3159.txt.asc?version=1&modificationDate=1486565167000&api=v2
    - https://www.cvedetails.com/cve/CVE-2017-3159/
affected:
    - groupId: "org.apache.camel"
      artifactId: "camel-snakeyaml"
      version:
        - "<=2.17.4"
        - "<=2.18.1,2.18"
      fixedin:
        - ">=2.17.5,2.17"
        - ">=2.18.2,2.18"
*/
