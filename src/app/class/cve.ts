export class VulnerableResult {
    constructor(vulnerableList: Array<VulnerablePart>) { }
};

export class VulnerablePart {
    constructor(vulnerableVersionList: Array<string>, javaModule: JavaModule, cve: Cve) { }
};

export class Cve {
    constructor(readonly cve: string, readonly title: string, readonly description: string, readonly references: Array<string>) { }
}

export class JavaModule {
    constructor(readonly groupId: string, readonly artifactId: string, readonly version: Array<string>, readonly fixedin: Array<string>, readonly unaffected: Array<string>) { }
}
