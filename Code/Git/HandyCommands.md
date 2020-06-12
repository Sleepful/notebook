handy comands
=

to have personal configs that are ignored
-
* `git update-index --assume-unchanged [FILE]`
for cases where it is expensive to check for files, avoid checking files. Changes lost when upstream changes come down
* `git update-index --skip-worktree [FILE]`
git knows the files has been mofidifed and pretends it hasn't been (to undo `--no-skip-worktree` )

<https://stackoverflow.com/questions/13630849/git-difference-between-assume-unchanged-and-skip-worktree>

git-filter-branch
-
reformat each commit

rebase --ignore-date
-
make author date the same as committer date

git push < commit >
-
push up to commit, e.g. `$ git push fc47b2` `$ git push HEAD~2`
alternatively: `git push <remoteName> <commit SHA>:<remoteBranchName>` 
e.g. `$ git push origin master~3:master`